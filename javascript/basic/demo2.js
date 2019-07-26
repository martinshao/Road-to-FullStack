global.gc();

process.memoryUsage();

const sleep = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep(1000).then(() => {
    // 这里写你的骚操作
})

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

console.info('script start');

sleep(2000).then(() => {
  console.info('1')
})
console.info('script end');

// script start -> script end -> 1

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

async function sleepAsync() {
  console.log('sleepAsync start')
  await sleep(2000).then(() => console.info('sleep'))
  console.log('sleepAsync end')
}

console.info('script start');
sleepAsync()
console.info('script end');

//Promise
const sleep = time => {
  return new Promise(resolve => setTimeout(resolve,time))
}
sleep(1000).then(()=>{
  console.log(1)
})

//Generator
function* sleepGenerator(time) {
  yield new Promise(function(resolve,reject){
    setTimeout(resolve,time);
  })
}
sleepGenerator(1000).next().value.then(()=>{console.log(1)})

//async
function sleep(time) {
  return new Promise(resolve => setTimeout(resolve,time))
}
async function output() {
  let out = await sleep(1000);
  console.log(1);
  return out;
}
output();

//ES5
function sleep(callback,time) {
  if(typeof callback === 'function')
    setTimeout(callback,time)
}

function output(){
  console.log(1);
}
sleep(output,1000);


function sleep(time) {
  function* gen () {
     yield new Promise((resolve, reject) => {
         setTimeout(() => {
             resolve()
         }, time)
     })
   }
   return gen().next().value;
}

console.info('script start');
sleep(1000).then(() => {
   console.log('sleep end');
});
console.info('script end');

Number.prototype.add = function (number) {
  if (typeof number !== 'number') {
      throw new Error('This value is not number.');
  }
  return this + number;
};
Number.prototype.minus = function (number) {
  if (typeof number !== 'number') {
      throw new Error('This value is not number.');
  }
  return this - number;
};
console.log((5).add(3).minus(2));