setTimeout(function() {
  console.info(1);
}, 0);

setImmediate(function() {
  console.info(2);
});

process.nextTick(() => {
  console.info(3);
});

new Promise((resolve, reject) => {
  console.info(4);
  resolve(4);
}).then(function() {
  console.log(5)
})

console.info(6)