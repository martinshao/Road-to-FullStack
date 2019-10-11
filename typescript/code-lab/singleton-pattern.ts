type PriceType = number | string

class Apple {
  private _color: string;
  private _price: PriceType;
  constructor(color, price) {
    this._color = color;
    this._price = price;
  }

  get color(): string {
    return this._color;
  }

  get price(): number | string {
    return this._price;
  }
}

class Singleton {
  private static instance: Singleton;
  private _apple: Apple;
  private constructor() {
    this._apple = new Apple('red', '');
  }

  public static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

  get apple(): Apple {
    return this._apple
  }

  someMethod() {}
}

// let someThing = new Singleton(); // Error: constructor of 'singleton' is private
let instance = Singleton.getInstance(); // do some thing with the instance

console.info(instance.apple);