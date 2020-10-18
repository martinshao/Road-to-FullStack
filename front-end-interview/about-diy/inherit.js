// 原型链继承

function Person(sex) {
  this.sex = sex
  this.eye = 'two'
}

Person.prototype.sayHello = function () {
  console.info(`Hello ${this.sex}`)
}

Person.location = 'earth'

const lucy = new Person('woman')
lucy.sayHello()

function American(name) {
  this.name = name
}

American.prototype = new Person()

American.prototype.eat = function () {
  console.info(`${this.name} like hamburger`)
}

const lily = new American('Lily')
lily.eat()
lily.sayHello()

console.info(lucy)
console.info(lily)

// 构造继承

function Parent(name) {
  this.name = name
}

Parent.prototype.greet = function () {
  console.info('Hello')
}

function Child() {
  this.sex = 'boy'
  Parent.call(this, 'child')
}
var child1 = new Child()
console.log(child1)

class SuperMan {
  constructor(name) {
    this.name = name
  }
}

const peter = new SuperMan('Spider Man')
console.info(peter)