async function async1() {
  console.info('async1 start')
  await async2();
  console.info('async1 end')
}

async function async2() {
  console.info('async2')
}

console.info('srcipt start')

setTimeout(() => {
  console.info('setTimeout')
}, 0);

async1()

new Promise((resolve) => {
  console.info('promise1')
  resolve()
}).then(() => console.info('promise2'))

console.info('script end')

