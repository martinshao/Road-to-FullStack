const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  a[index] = num * 2;
});

console.info(a);
console.info(doubled);

const b = [1, 2, 3];
const doubled_2 = b.map(num => {
  return num * 2;
});

console.info(b);
console.info(doubled_2);