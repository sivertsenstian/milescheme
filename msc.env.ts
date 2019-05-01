import { Env, MSCSymbol } from "./msc.types";

// An environment with some Scheme standard procedures.
const standard = (): Env => {
  let env = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    ">": (a, b) => a > b,
    "<": (a, b) => a < b,
    ">=": (a, b) => a >= b,
    "<=": (a, b) => a <= b,
    "=": (a, b) => a === b,
    abs: a => Math.abs(a),
    append: (a, b) => a + b,
    apply: (proc, args) => proc(...args),
    begin: (...x) => x.pop(),
    car: x => x[0],
    cdr: x => x.shift(),
    cons: (a, b) => [...a, b],
    "eq?": (a, b) => a === b,
    expt: (a, b) => Math.pow(a, b),
    "equal?": (a, b) => a === b,
    length: x => x.length,
    list: (...x) => [...x],
    "list?": x => x instanceof Array,
    map: x => x.map,
    max: x => Math.max(x),
    min: x => Math.min(x),
    not: (a, b) => a !== b,
    "null?": x => x === null,
    "number?": x => x instanceof Number,
    print: x => console.log(x),
    "procedure?": x => x instanceof Function,
    round: x => Math.round(x),
    "symbol?": x => x instanceof String,
    pi: Math.PI,
    cos: Math.cos,
    sin: Math.sin,
    tan: Math.tan
  };

  return env;
};

export const global = standard();
