import { Atom, MSCSymbol, MSCNumber, Exp, List } from "./msc.types";

// Convert a string of characters into a list of tokens.
export const tokenize = (chars: string): List => {
  return chars
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .split(" ")
    .filter(t => t.length > 0);
};
