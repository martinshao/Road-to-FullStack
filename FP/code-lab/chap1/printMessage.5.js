const addToDom = (elementId) => { return document.querySelector(`#${elementId}`)}

const h1 = (message) => `<h1>${message}</h1>`
const echo = message => message;

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

var printMessage = run3(addToDom('msg'), h1, echo);

printMessage('Hello World');