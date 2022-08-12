function Bird(name) {
  console.info('Bird Constructor calling')
  this.name = name
  this.organ = ['wing', 'claw']
}

function Sparrow(name) {
  Bird.call(this, name)
}

const a = new Sparrow('xiaohong')
const b = new Sparrow('xiaoming')