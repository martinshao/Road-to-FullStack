// async function timout(param) {
//     return new Promise(resolve =>
//         setTimeout(
//             function (params) {
//                 console.info('wait1---', params);
//                 resolve(params);
//             },
//             3 * 1000, param + 1)
//     )
// }

// function getSomething(param) {
//     console.info('getSomething', param);
//     return "something";
// }

// async function test() {
//     console.info('---test---start---')
//     const v1 = await timout(10);
//     console.info('---await---1---')
//     const v2 = getSomething(v1);
//     console.info('---await---2---')
//     console.log(v1, v2);
// }

// test();

setTimeout(function () {
    console.info(1);
}, 0);

setImmediate(function () {
    console.info(2);
});

process.nextTick(() => {
    console.info(3);
});

new Promise((resolve, reject) => {
    console.info(4);
    resolve(4);
}).then(function () {
    console.log(5)
})

console.info(6)

// 4 6 2 3 4 5

await xx();

function test() {}
test()