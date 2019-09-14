setImmediate(() => console.info('setImmediate'));
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));


function test(x, y, z) {
    let args = [...arguments]
    console.info(...args);
}

test(1, 2, 3);

fn1 = (a, b, c, d) => a - b * c + d;

function bindLeft() {
    let fn = [...arguments][0]
    let args = [...arguments].slice(1, 3);
    return fn.bind(null, ...args);
}

fn2 = bindLeft(fn1, 1, 2);
console.log(fn2(3, 4));