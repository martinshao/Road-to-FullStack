

function Foo() {
  getName = function() {console.info(1)}
  return this;
}

Foo.getName = function() {console.info(2)}

Foo.prototype.getName = function() {console.info(3)}

var getName = function() {console.info(4)}

function getName() {
  console.info(5)
}

Foo.getName();
getName();

Foo().getName()
getName();

new Foo.getName();

new new Foo().getName()