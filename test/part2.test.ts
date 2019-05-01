import { atom, parse, readFromTokens } from "../msc";
import { MSCNumber, MSCSymbol } from "../msc.types";

describe("syntax tree", () => {
  describe("atom", () => {
    test("is a function", () => {
      expect(atom).toBeDefined();
      expect(atom).toBeInstanceOf(Function);
    });

    test("returns an int", () => {
      const result = atom("1337");
      expect(result).toEqual(new MSCNumber(1337));
    });

    test("returns a float", () => {
      const result = atom("3.14");
      expect(result).toEqual(new MSCNumber(3.14));
    });

    test("returns as symbol if not number", () => {
      const result = atom("something");
      expect(result).toEqual(new MSCSymbol("something"));
    });
  });

  describe("readFromTokens", () => {
    test("is a function", () => {
      expect(readFromTokens).toBeDefined();
      expect(readFromTokens).toBeInstanceOf(Function);
    });

    test("handles atoms", () => {
      const num = readFromTokens(["10"]);
      expect(num).toEqual(new MSCNumber(10));

      const sym = readFromTokens(["symbol"]);
      expect(sym).toEqual(new MSCSymbol("symbol"));
    });

    test("handles a single expression", () => {
      const result = readFromTokens(["(", "define", "x", "10", ")"]);
      expect(result).toEqual([
        new MSCSymbol("define"),
        new MSCSymbol("x"),
        new MSCNumber(10)
      ]);
    });

    test("handles a single nested expression", () => {
      const result = readFromTokens([
        "(",
        "begin",
        "(",
        "define",
        "x",
        "10",
        ")",
        ")"
      ]);
      expect(result).toEqual([
        new MSCSymbol("begin"),
        [new MSCSymbol("define"), new MSCSymbol("x"), new MSCNumber(10)]
      ]);
    });
  });

  describe("parse", () => {
    test("is a function", () => {
      expect(parse).toBeDefined();
      expect(parse).toBeInstanceOf(Function);
    });

    test("parses definition", () => {
      const result = parse("(define x 10)");
      expect(result).toEqual([
        new MSCSymbol("define"),
        new MSCSymbol("x"),
        new MSCNumber(10)
      ]);
    });

    test("parses a simple expression", () => {
      const result = parse("(+ 10 (+ 1 y))");
      expect(result).toEqual([
        new MSCSymbol("+"),
        new MSCNumber(10),
        [new MSCSymbol("+"), new MSCNumber(1), new MSCSymbol("y")]
      ]);
    });

    test("parses a complex expression", () => {
      const result = parse("(begin (define r 10) (* pi (* r r)))");
      expect(result).toEqual([
        new MSCSymbol("begin"),
        [new MSCSymbol("define"), new MSCSymbol("r"), new MSCNumber(10)],
        [
          new MSCSymbol("*"),
          new MSCSymbol("pi"),
          [new MSCSymbol("*"), new MSCSymbol("r"), new MSCSymbol("r")]
        ]
      ]);
    });
  });
});
