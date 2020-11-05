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

// 组合式继承

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'black', 'green']
}

Parent.prototype.getName = function () {
  console.info(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

// 寄生组合式继承

function prototype(subType, superType) {
  const prototype = Object.create(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function Child(age) {
  this.age = age;
}

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

function SuperType(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}
SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

inheritPrototype(SubType, SuperType)
SubType.prototype.sayAge = function () {
  console.log(this.age)
}

const super1 = new SuperType('Rose')
const sub1 = new SubType('Martin', 12)
const sub2 = new SubType('Robot', 16)

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getDistance() {
    const distance = Math.sqrt(this.x * this.x + this.y * this.y)
    console.info('distance...', distance)
    return distance
  }
}

class ColorPoint extends Point {

  constructor(x, y, color) {
    super(x, y)
    this.color = color
  }

  getColor() {
    console.info('This point color is', this.color)
  }
}

const p1 = new Point(1, 1)
const cp1 = new ColorPoint(2, 2, 'red')
const cp2 = new ColorPoint(3, 3, 'yellow')