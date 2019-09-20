// var currentScope = 0; // global scope
// (function () {
//   var currentScope = 1, one = 'scope1';
//   console.info(currentScope);
//   (function () {
//     var currentScope = 2, two = 'scope2';
//     console.info(currentScope);
//     (function () {
//       var currentScope = 3, three = 'scope3';
//       console.info(currentScope);
//       console.info(one, two, three); // climb up the scope chain to get one and two
//     }());
//   }());
// }());

function one() {
  var currentScope = 1, oneV = 'scope1';
  console.info(currentScope);
  two();
}
function two() {
  var currentScope = 2, twoV = 'scope2';
  console.info(currentScope);
  three();
}
function three() {
  var currentScope = 3, threeV = 'scope3';
  console.info(currentScope);
  console.info(oneV, twoV, threeV);
}
one();