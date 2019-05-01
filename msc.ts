import { Atom, MSCSymbol, MSCNumber, Exp, List } from "./msc.types";

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
    let l : any[] = [];
    while (tokens[0] !== ')') {
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
