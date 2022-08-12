function Human(name) {
  console.info('Human Constructor calling')
  this.name = name
  this.species = 'human'
  this.organ = ['heart', 'lung']
}

Human.prototype.getSpecies = function () {
  console.info(this.species)
  return this.species
}

Human.prototype.getName = function () {
  console.info(this.name)
  return this.name
}

function Asian() {

}

Asian.prototype = new Human()

const a = new Asian()
const b = new Asian()
