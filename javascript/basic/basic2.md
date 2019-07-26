## 关于原型的题目

### 考察原型链
``` js
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
```

``` js
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
  return (function() {
    return o
  })();
}
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

``` js
var person = {
    name : "leaf"
};
function obj(o){
    o = {
       name : "kafu"
    };
    return o;
}
var result = obj(person);
console.log(result.name);// kafu
console.log(person.name);// leaf
```

### 考察函数参数传递
```js
var person  = {
    name : "leaf"
};
function obj(o){
    o.name = "kafu";
   return o;
}
var result = obj(person);
console.log(result.name);// kafu
console.log(person.name);// kafu
```

```js
// example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);
```

``` js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)
```