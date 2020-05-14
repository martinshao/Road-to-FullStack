
const Jhon = { name1: 'Jhon', age1: 18 }
const Lily = { name2: 'Lily', age2: 17 }

const Joly = { ...Jhon, ...Lily }
const Joly = Object.assign({}, Jhon, Lily)