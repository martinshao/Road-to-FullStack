

const fn1 = (a, b, c, d) => a - b * c + d;
const fn2 = bindLeft(fn1, 1, 2);
console.log(fn2(3, 4));

// new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务
console.log('----------------- start -----------------');
setTimeout(() => {
    console.log('setTimeout');
}, 0)
new Promise((resolve, reject) => {  // new Promise(xx)相当于同步任务, 会立即执行, .then后面的是微任务
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    resolve();
}).then(() => {
    console.log('promise实例成功回调执行');
})
console.log('----------------- end -----------------');

function sleep(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(' enough sleep~');
        }, second);
    })
}
function normalFunc() {
    console.log('normalFunc');
}
async function awaitDemo() {
    await normalFunc();
    console.log('something, ~~');
    let result = await sleep(2000);
    console.log(result);
}
awaitDemo();

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}

asyncPrint('hello world', 50);

async function getStockSymbol(name) {
    setTimeout(function () {
        return name
    }, 2000);
}

async function getStockPrice(symbol) {
    setTimeout(function () {
        return symbol
    }, 3000)
}

async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    console.info(symbol);
    const stockPrice = await getStockPrice(symbol);
    console.info(stockPrice);
    return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
    console.log(result);
});

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve('shaogucheng'), ms);
    });
}

async function asyncPrint(value, ms) {
    const name = await timeout(ms);
    console.info('name', name);
    console.log(value);
}

asyncPrint('hello world', 50);

function* helloWorldGenerator() {
    yield 'hello';
    console.info('hello');
    yield 'world';
    console.info('world');
    return 'ending';
}

var hw = helloWorldGenerator();

var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    }
};

const arrs = flat(arr)

const arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
// 方式一：递归（代码太多已省略）
// 方式二：toString（格式转换） 隐式类型转换   [1,2,3].toString() = 1,2,3
// 方式三：valueOf（格式转化），和toString差不多，把toString换成valueOf
/*const flag = (arr) => {
  let toString = Array.prototype.toString
  Array.prototype.toString = function() {   // 改变
    return this.join(',')
  }
  Array.prototype.toString = toString   // 还原
  return arr + ''  // 隐式类型转换，这里arr会先调用valueOf结果返回不是基本数据类型则继续调用toString然后结束，否则会报错
}
console.log(flag(arr))*/

// 方式四：Iterator 对新型的数据结构进行遍历
Array.prototype[Symbol.iterator] = function () {
    let arr = [].concat(this) // arr = ['a', ['b', 'c'], 2, ['d', 'e', 'f'], 'g', 3, 4]
    let getFirst = function (array) {
        let first = array.shift()
        return first
    }
    return {  // 遍历器必须返回对象，并且有next()方法
        next() {
            let item = getFirst(arr)
            if (item) {
                return {
                    value: item,  // 返回的值，如果item是数组则调toString
                    done: false   // 是否遍历结束
                }
            } else {
                return {
                    done: true
                }
            }
        }
    }
}
const flag = function (arr) {
    let r = []
    for (let i of arr) { r.push(i) }
    return r.join(',')
}
console.log(flag(arr))

function flat(arr) {
    if (arr.length < 1 || !arr instanceof Array) return arr;
    let array = []
    for (let i of arr.values()) {
        if (i instanceof Array) {
            array = [...array, ...flat(i)]
        } else {
            array.push(i)
        }
    }
    return array;
}

function wait() {
    return new Promise(resolve =>
        setTimeout(resolve, 10 * 1000)
    )
}

async function main1() {
    console.time();
    await wait();
    await wait();
    await wait();
    console.timeEnd();
}

async function main2() {
    console.time();
    const x = wait();
    const y = wait();
    const z = wait();
    await x;
    await y;
    await z;
    console.timeEnd();
}