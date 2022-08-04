var a = 1
let b = 2
const c = 3

function print() {
  console.info(this.a, this.b, this.c)
}

const d = {
  a: 5,
  b: 6,
  c: 7,
}

print.call(d)

const param = {
  a: 'A',
  b: 'B',
  c: 'C',
}

const obj = {
  ...param,
  print: print
}

class Animal {
  constructor(name) {
    this.name = name
  }

  printName() {
    console.info(this.name)
  }
}

class Dog extends Animal {
  constructor(name, age) {
    super(name)
    this.age = age
  }

  printAge() {
    console.info(this.age)
  }
}

class Husky extends Dog {
  constructor(name, age, origin) {
    super(name, age)
    this.origin = origin
  }

  printOrigin() {
    console.info(this.origin)
  }
}

const animal = new Animal('cat')

const wangcai = new Dog('wangcai', 12)

const biu = new Husky('biu', 13, 'Siberia')