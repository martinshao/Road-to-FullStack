const compose = (f, g) => x => f(g(x))

const toUpperCase = x => x.toUpperCase()

const exclaim = x => x + '!'

const shout = compose(exclaim, toUpperCase)

// const shout = x => exclaim(toUpperCase(x))

console.info(shout('send in the clowns'))

const head = x => x[0]

const reverse = R.reduce((acc, x) => [x].concat(acc), [])

const last = compose(head, reverse)

console.info(last(['jumpkick', 'roundhouse', 'uppercut']))

// 结合律（associativity）
// const associative = compose(f, compose(g, h)) == compose(compose(f, g), h);

const lastUpper = R.compose(toUpperCase, head, reverse);

const loudLastUpper = R.compose(exclaim, toUpperCase, head, reverse)

console.info(lastUpper(['jumpkick', 'roundhouse', 'uppercut']))
console.info(loudLastUpper(['jumpkick', 'roundhouse', 'uppercut']))