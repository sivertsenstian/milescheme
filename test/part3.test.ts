import { parse, evaluate } from "../msc";
import { MSCSymbol, MSCNumber } from "../msc.types";
import { global } from "../msc.env";

describe("evaluation", () => {
  describe("evaluate", () => {
    test("is a function", () => {
      expect(evaluate).toBeDefined();
      expect(evaluate).toBeInstanceOf(Function);
    });

    test("Evaluates a global symbol", () => {
      const program = parse("+");
      const result = evaluate(program);

      expect(result).toBeDefined();
      expect(result).toEqual(global["+"]);
    });

    test("Evaluates a number", () => {
      const program = parse("10");
      const result = evaluate(program);

      expect(result).toEqual(10);
    });

    test("Evaluates a global function", () => {
      const program = parse("(+ 1 2)");
      const result = evaluate(program);
      expect(result).toEqual(3);
    });

    test("Evaluates a program", () => {
      const program = parse("(max 100 (/ (+ 10 (* 2 5)) 2))");
      const result = evaluate(program);

      expect(result).toEqual(100);
    });

    test("Evaluates a true conditional", () => {
      const program = parse("(if (> 10 3) 500 1000)");
      const result = evaluate(program);

      expect(result).toEqual(500);
    });

    test("Evaluates a false conditional", () => {
      const program = parse("(if (> 1 3) 500 1000)");
      const result = evaluate(program);

      expect(result).toEqual(1000);
    });

    test("Registers a user defined symbol", () => {
      const program = parse("(define a 1337)");

      evaluate(program);

      expect(global.a).toBeDefined();
      expect(global.a).toEqual(1337);
    });

    test("Evaluates a program with user defined symbol", () => {
      const program = parse("(begin (define r 10) (* pi (* r r)))");
      const result = evaluate(program);

      expect(result).toEqual(314.1592653589793);
    });
  });
});
