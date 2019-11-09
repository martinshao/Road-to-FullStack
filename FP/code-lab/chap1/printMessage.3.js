const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

var echoDocument = document.writeln.bind(document);

var h1 = function (text) { 
    return "<h1>" + text + "</h1>"; 
}

var printMessage = compose(echoDocument, h1);
printMessage("Hello World");

var run = (...functions) => x => {
  functions.reverse().forEach(func => x = func(x));
  return x;
};

const compose = ( ...fns ) => fns.reduce( ( f, g ) => ( ...args ) => f( g( ...args ) ) );

compose(fn3, fn2, fn1);

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);