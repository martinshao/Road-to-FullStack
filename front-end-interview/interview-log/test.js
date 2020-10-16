const input = {
    a: 1,
    b: [1, 2, {
            c: true
        },
        [3]
    ],
    d: {
        e: 2,
        f: 3
    },
    g: null,
}

function flatten(input) {
    const result = {}


}

console.info(flatten(input))


console.log(1)

setTimeout(() => {
    console.log(2)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
})
console.info(111)
new Promise(resolve => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})
console.info(222)
setTimeout(() => {
    console.log(9)
    new Promise(resolve => {
        console.log(11)
        resolve()
    }).then(() => {
        console.log(12)
    })
})
console.info(333)
// node.js
// 1 => 7 => 8 => 2 => 4 => 9 => 11 => 5 => 12

// chrome
// 1 => 7 => 8 => 2 => 4 => 5 => 9 => 11 => 12

// let p1 = null
// let p2 = null

// console.log(1)

// setTimeout(() => {
//     console.log(2)
//     p1 = new Promise(resolve => {
//         console.log(4)
//         resolve()
//     })
// })
// console.info(111)
// new Promise(resolve => {
//     console.log(7)
//     resolve()
// }).then(() => {
//     console.log(8)
// })
// console.info(222)
// setTimeout(() => {
//     console.log(9)
//     p1.then(() => {
//         console.log(5)
//     })
//     setTimeout(() => {
//         console.info(999)
//     });
//     p2 = new Promise(resolve => {
//         console.log(11)
//         resolve()
//     })
//     p2.then(() => {
//         console.log(12)
//     })
// })
// console.info(333)