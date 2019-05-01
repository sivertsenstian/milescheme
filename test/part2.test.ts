import { atom, parse, readFromTokens } from "../msc";

describe("syntax tree", () => {
  describe("atom", () => {
    test("is a function", () => {
      expect(atom).toBeDefined();
      expect(atom).toBeInstanceOf(Function);
    });

    test("returns an int", () => {
      const result = atom("1337");
      expect(result).toEqual(1337);
    });

    test("returns a float", () => {
      const result = atom("3.14");
      expect(result).toEqual(3.14);
    });

    test("returns as symbol if not number", () => {
      const result = atom("something");
      expect(result).toEqual("something");
    });
  });

  describe("readFromTokens", () => {
    test("is a function", () => {
      expect(readFromTokens).toBeDefined();
      expect(readFromTokens).toBeInstanceOf(Function);
    });

    test("handles atoms", () => {
      const num = readFromTokens(["10"]);
      expect(num).toEqual(10);

      const sym = readFromTokens(["symbol"]);
      expect(sym).toEqual("symbol");
    });

    test("handles a single expression", () => {
      const result = readFromTokens(["(", "define", "x", "10", ")"]);
      expect(result).toEqual(["define", "x", 10]);
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
      expect(result).toEqual(["begin", ["define", "x", 10]]);
    });
  });

  describe("parse", () => {
    test("is a function", () => {
      expect(parse).toBeDefined();
      expect(parse).toBeInstanceOf(Function);
    });

    test("parses definition", () => {
      const result = parse("(define x 10)");
      expect(result).toEqual(["define", "x", 10]);
    });

    test("parses a simple expression", () => {
      const result = parse("(+ 10 (+ 1 y))");
      expect(result).toEqual(["+", 10, ["+", 1, "y"]]);
    });

    test("parses a complex expression", () => {
      const result = parse("(begin (define r 10) (* pi (* r r)))");
      expect(result).toEqual([
        "begin",
        ["define", "r", 10],
        ["*", "pi", ["*", "r", "r"]]
      ]);
    });
  });
});
