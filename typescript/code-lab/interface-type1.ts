// 基本类型别名
// type Name = string

// 联合类型
interface Dog {
  wong();
}
interface Cat {
  miao();
}

type Pet = Dog | Cat

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet]

// const arr: PetList = [wong(),miao()]

type StringOrNumber = string | number;

type Texts = string | { text: string };

// type NameLookup = Dictionary<string, Person>;

type Callback<T> = (data: T) => void;

type Pair<T> = [T, T];

type Coordinatess = Pair<number>;

// type LinkedList<T> = T & { next: LinkedList<T> };

// interface Person {
//   name: string;
// }

// var people: LinkedList<Person>;
// var s = people.name;
// var s = people.next.name;
// var s = people.next.next.name;
// var s = people.next.next.next.name;

type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}

interface IDictionary {
  add(key: string, value: any): void;
  remove(key: string): void;
  containsKey(key: string): boolean;
  keys(): string[];
  values(): any[];
}

class Dictionary {

  _keys: string[] = new Array;
  _values: any[] = new Array;

  constructor(init: { key: string; value: any; }[]) {

    for (var x = 0; x < init.length; x++) {
      this[init[x].key] = init[x].value;
      this._keys.push(init[x].key);
      this._values.push(init[x].value);
    }
  }

  add(key: string, value: any) {
    this[key] = value;
    this._keys.push(key);
    this._values.push(value);
  }

  remove(key: string) {
    var index = this._keys.indexOf(key, 0);
    this._keys.splice(index, 1);
    this._values.splice(index, 1);

    delete this[key];
  }

  keys(): string[] {
    return this._keys;
  }

  values(): any[] {
    return this._values;
  }

  containsKey(key: string) {
    if (typeof this[key] === "undefined") {
      return false;
    }

    return true;
  }

  toLookup(): IDictionary {
    return this;
  }
}
