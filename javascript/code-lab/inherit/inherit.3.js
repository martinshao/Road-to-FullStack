function Dog(name) {
  this.name = name
  this.organ = ['claw', 'heart', 'lung']
}

function Akita(name, age) {
  Dog.call(this, name)
  this.age = age
}

Akita.prototype = new Dog()
Akita.prototype.constructor = Akita

const laifu = new Akita('laifu', 1)
const wangcai = new Akita('wangcai', 2)