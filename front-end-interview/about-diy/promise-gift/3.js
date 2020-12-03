
function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

console.info('script start')

setImmediate(() => {
  console.log('immediate1');
});

setTimeout(() => {
  console.info('timeout1')
}, 0);

const p1 = new Promise((resolve) => {
  console.info('p1 exec start')
  resolve('p1 success')
  console.info('p1 exec end')
})

console.info('run middle...')

setImmediate(() => {
  console.log('immediate2');
});

setTimeout(() => {
  console.info('timeout2')
}, 0);

someAsyncApiCall(() => {
  console.info('nextTick...')
});

const p2 = p1.then(res => {
  console.info('p1 then')
  console.info('p1 result', res)
})

setTimeout(() => {
  console.info('timeout3')
}, 0);

const p3 = p2.then(res => {
  console.info('p2 then')
  console.info('p2 result', res)
})

console.info('script end')

/*
p1 exec start
p1 exec end
run middle...
script end
nextTick...
p1 then
p1 result p1 success
p2 then
p2 result undefined
timeout1
timeout2
timeout3
*/