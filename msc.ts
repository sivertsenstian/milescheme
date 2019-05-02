import { Atom, Env, Exp, List, MSCNumber, MSCSymbol } from "./msc.types";

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
  return new MSCNumber(1);
};

// Read an expression from a sequence of tokens.
export const readFromTokens = (tokens: List): Exp => {
  return atom("1");
};

// Read a Scheme expression from a string.
export const parse = (program: string): Exp => {
  return [];
};
