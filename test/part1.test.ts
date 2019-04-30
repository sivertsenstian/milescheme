import { tokenize } from "../msc";

describe("parsing", () => {
  describe("tokenize", () => {
    test("is a function", () => {
      expect(tokenize).toBeDefined();
      expect(tokenize).toBeInstanceOf(Function);
    });

    test("returns an array", () => {
      const result = tokenize("(parenthesis (is (love)))");
      expect(result).toBeInstanceOf(Array);
    });

    test("separates tokens and parenthesises", () => {
      const result = tokenize("(parenthesis)");
      expect(result).toEqual(["(", "parenthesis", ")"]);
    });

    test("test program supported", () => {
      const program = "(begin (define r 10) (* pi (* r r)))";
      const result = tokenize(program);

      expect(result).toEqual([
        "(",
        "begin",
        "(",
        "define",
        "r",
        "10",
        ")",
        "(",
        "*",
        "pi",
        "(",
        "*",
        "r",
        "r",
        ")",
        ")",
        ")"
      ]);
    });
  });
});
