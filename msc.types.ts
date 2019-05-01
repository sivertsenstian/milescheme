// A Scheme Symbol is implemented as a string
export class MSCSymbol {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value(): string {
    return this._value;
  }
}

// A Scheme Number is implemented as a number
export class MSCNumber {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
// A Scheme Atom is a Symbol or Num
export type Atom = MSCSymbol | MSCNumber;
// A Scheme List is implemented as an array
export type List = any[];
// A Scheme expression is an Atom or List
export type Exp = Atom | List;
// A Scheme environment (defined below)
// is a mapping of {variable: value}
export type Env = { [key: string]: any };
