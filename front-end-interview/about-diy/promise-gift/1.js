setTimeout(() => {
  console.info('a');
}, 0);

console.info('b');

new Promise((resolve, reject) => {
  console.info('c');
  resolve();
}).then(() => console.info('d'));

console.info('e');

// b -> c -> e -> d -> a
