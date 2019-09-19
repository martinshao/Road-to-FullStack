# Typescript的一些小别致操作

## 工厂方法

在泛型里使用类类型

``` ts
function create<T>(c: {new(): T; }): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
```

``` ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

type Partial<T> = {
    [P in keyof T]?: T[P];
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
}

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Record<K extends string, T> = {
    [P in K]: T;
}

type Diff<T extends string, U extends string> =
    ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];  
type Overlap<T extends string, U extends string> = Diff<T, Diff<T, U>>;
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
type Overwrite<T, U> = Omit<T, Diff<keyof T, Diff<keyof T, keyof U>>> & U;

type Purify<T extends string> = { [P in T]: T; }[T];
type NonNullable<T> = T & {};
type Required<T> = {
  [P in Purify<keyof T>]: NonNullable<T[P]>;
};
```

``` ts
type Omit = Pick<T, Exclude<keyof T, K>>
```

``` ts
let defaultState = {
    foo: 7,
    bar: 'hello'
};

type State = typeof defaultState;

let nextState: State = {
    foo: 'seven',
    bar: 'world'
};
```

``` ts
function getState() {
    return {
        foo: 7,
        bar: 'hello'
    };
}

type State = ReturnType<typeof getState>;

let nextState: State = {
    foo: 'seven',
    bar: 'world'
};
```
