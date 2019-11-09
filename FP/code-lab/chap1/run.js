/*
 * Functional Programming in JavaScript
 * Chapter 01
 * Magical -run- function in support of Listing 1.1
 * Author: Luis Atencio
 */
// -run- with two functions 
var run2 = function(f, g) {
  return function(x) {
      return f(g(x));
  };
};

// -run- with three functions
var run3 = function(f, g, h) {
  return function(x) {
        return f(g(h(x))); 
  };
};

// Test this magical function
var add1 = function(x) {return x + 1;};
var mult2 = function(x) {return x * 2;};
var square = function(x) {return x * x;};
var negate = function(x) {return -x;};

var double = run2(add1, add1);
console.log(double(2)); //-> 4

var testRun = run3(negate, square, mult2);
console.log(testRun(2)); //->-16