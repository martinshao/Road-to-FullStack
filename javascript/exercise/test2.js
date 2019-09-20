let a = 20;
const b = 30;
var c;

function print(a) {
  var g = 5;
  g = g + a
  console.info(a);
  console.info(g);
}

function add(a, b) {
  print(a);
  return a + b;
}

function multiply(e, f) {
  var g = add(10 + e);
  return e * f * g;
}

let Calculate = {
  a: 201,
  multiply: multiply
}