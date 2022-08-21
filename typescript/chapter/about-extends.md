## Typescript extends 关键字总结

> * 继承 => 接口继承/类继承；多继承
> * 泛型约束
> * 类型判断
> * 高阶类型


``` ts
interface Dog {
  name: string;
}

interface Shepherd {
  guardian: boolean;
}

// 接口继承 + 多继承
interface Animal extends Dog, Shepherd {
  age: number;
}

const a1: Animal = {
  name: 'Tom',
  guardian: true,
  age: 3,
};
```

``` ts
type Name = { 
  name: string; 
}
// 接口继承type
interface User extends Name { 
  age: number; 
}
```


``` ts
function getCnames<T extends { name: string }>(entities: T[]):string[] {
  return entities.map(entity => entity.cname)
}
interface Dispatch<T extends { type: string }> {
  (action: T): T
}
```

``` ts
type Human = {
  name: string;
}
type Duck = {
  name: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'yes'

type Human = {
  name: string;
  occupation: string;
}
type Duck = {
  name: string;
}
type Bool = Duck extends Human ? 'yes' : 'no'; // Bool => 'no'
```

``` ts
type Extract<T, U> = K extends U ? T : never;
type Exclude<T, U> = T extends U ? never : T
type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
}

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type CommonKeys = Extract<'a'| 'b' | 'c', 'd'|'c'> // => 'c'

type Obj = Extract<
  string[] | boolean | string,
  number | string | string[] | void
> // string | string[]

interface Men {
  sex: 'male';
  age: number;
  lover: Men;
}

type Boy = Omit<Men, 'lover'>; // { sex: 'male'; age: number; }
```