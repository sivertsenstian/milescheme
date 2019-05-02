import {global} from './msc.env';
import { Atom, MSCSymbol, MSCNumber, Exp, List, Env } from "./msc.types";

// Convert a string of characters into a list of tokens.
export const tokenize = (chars: string): List => {
  return chars
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .split(" ")
    .filter(t => t.length > 0);
};

// Numbers become numbers; every other token is a symbol.
export const atom = (token: string): Atom => {
  const result = Number(token);
  return isNaN(result) ? new MSCSymbol(token) : new MSCNumber(result); 
};

// Read an expression from a sequence of tokens.
export const readFromTokens = (tokens: List): Exp => {
  if (tokens.length === 0) {
    throw new SyntaxError("unexpected EOF");
  }
  let token = tokens.shift();
  if (token === "(") {
    let l: any[] = [];
    while (tokens[0] !== ")") {
      l.push(readFromTokens(tokens));
    }
    tokens.shift();
    return l;
  } else if (token === ")") {
    throw new SyntaxError("unexpected token");
  } else {
    return atom(token as string);
  }
};

// Read a Scheme expression from a string.
export const parse = (program: string): Exp => {
  return readFromTokens(tokenize(program));
};

// Evaluate an expression in an environment.
export const evaluate = (x: Exp, env : Env = global) : any => { 
  if (x instanceof MSCSymbol) {
    return env[x.value];    
  } 
  else if (x instanceof MSCNumber){
    return x.value;
  }
  else if (x[0].value === 'if') {
      const [, test, conseq, alt] = x;
      const exp = evaluate(test, env) ? conseq : alt;
      return evaluate(exp, env);
  }
  else if (x[0].value === 'define') {
    const [, symbol, exp] = x;
    env[symbol.value] = evaluate(exp, env);
  }
  else {
    const [y, ...rest] = x as Atom[];
    const proc = evaluate(y, env);
    const args = rest.map(arg => evaluate(arg, env));
    return proc(...args);
  }
}
