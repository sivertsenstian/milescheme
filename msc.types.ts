// A Scheme Symbol is implemented as a string
export type MSCSymbol = string;
// A Scheme Number is implemented as an int or float
export type MSCNumber = number;
// A Scheme Atom is a Symbol or Num
export type Atom = MSCSymbol | MSCNumber;
// A Scheme List is implemented as an array
export type List = string[];
// A Scheme expression is an Atom or List
export type Exp = Atom | List;
// A Scheme environment (defined below)
// is a mapping of {variable: value}
export type Env = {};
