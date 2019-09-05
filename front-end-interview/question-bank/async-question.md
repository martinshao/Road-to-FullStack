# JavaScript异步问题面试题总结

## 输出以下代码执行结果，大致时间就好（不同于上题）

``` js
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();
```
