function isBiggerThan10(element, index, array) {
  console.info(element, index, array)
  return element > 10;
}

var anObj = { '1': 'a', '8': 'b', '7': 'c' };
Object.keys(anObj);

let a = 1;
[1, 2, 3].includes(a);
['1', '2', '3'].includes(a);

a in [1, 2, 3];
a in ['1', '2', '3'];

[1,2,3].indexOf(a);


function Foo() {
  Foo.a = function() {
      console.log(1)
  }
  this.a = function() {
      console.log(2)
  }
}

Foo.prototype.a = function() {
  console.log(3)
}

Foo.a = function() {
  console.log(4)
}

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();


var person  = {
  name : "leaf"
};
function obj(o){
  o.name = "kafu";
 return o;
}
var result = obj(person);
