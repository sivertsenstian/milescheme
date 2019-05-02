import { schemestr } from "../msc";

describe("REPL", () => {
  describe("schemestr", () => {
    test("is a function", () => {
      expect(schemestr).toBeDefined();
      expect(schemestr).toBeInstanceOf(Function);
    });

    test("stringifies an expression", () => {
      const result = schemestr(100);
      expect(result).toEqual("100");
    });

    test("stringifies an array", () => {
      const result = schemestr([1, 2, 3, 4]);
      expect(result).toEqual("(1 2 3 4)");
    });
  });
});
