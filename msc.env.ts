import { Env, MSCSymbol } from "./msc.types";

// An environment with some Scheme standard procedures.
const standard = (): Env => {
  let env = {
    "+": (...args) => args.reduce((a, b) => a + b),
    "-": (...args) => args.reduce((a, b) => a - b),
    "*": (...args) => args.reduce((a, b) => a * b),
    "/": (...args) => args.reduce((a, b) => a / b),
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "=": (a, b) => a === b,
    abs: a => Math.abs(a),
    append: (...args) => args.reduce((a, b) => [...a, ...b]),
    apply: (proc, args) => proc(...args),
    begin: (...x) => x.pop(),
    car: x => x[0],
    cdr: x => x.slice(1),
    cons: (a, b) => [...a, b],
    "eq?": (a, b) => a === b,
    expt: (a, b) => Math.pow(a, b),
    "equal?": (a, b) => a === b,
    length: x => x.length,
    list: (...x) => [...x],
    "list?": x => x instanceof Array,
    map: x => x.map,
    max: (...args) => args.reduce((a, b) => Math.max(a, b)),
    min: (...args) => args.reduce((a, b) => Math.min(a, b)),
    not: (a, b) => a !== b,
    "null?": x => x === null,
    "number?": x => String(!isNaN(Number(x))),
    print: x => console.log(x),
    "procedure?": x => String(typeof x === "function"),
    round: x => Math.round(x),
    "symbol?": x => String(typeof x === "string"),
    pi: Math.PI,
    cos: Math.cos,
    sin: Math.sin,
    tan: Math.tan
  };

  return env;
};

export const global = standard();
