# javascript AO VO GO

``` js
// 举例来说，我们可以用普通的ECMAScript对象来表示一个变量对象：

VO = {};
```

``` js
// 就像我们所说的, VO就是执行上下文的属性(property)：

activeExecutionContext = {
  VO: {
    // 上下文数据（var, FD, function arguments)
  }
};

```

活动上下文和执行上下文，是同一个名词，活动上下文包括了 ( `VO`, `this` , `Scope` )

> `VO`: `Activation Object` -> 活动对象  
> `this`: `this` 绑定，对！这就是为函数执行指定上下文的 `this`  
> `Scope`: `Scope chain` 这个属性就是作用域链

``` js
activeExecutionContext = {
  VO: {...}, // or AO
  this: thisValue,
  Scope: [ // Scope chain
    // 所有变量对象的列表
    // for identifiers lookup
    // AO + [[Scope]]
  ]
};
```

作用域链是 父变量对象(parent variable objects) 列表外加(在作用域链头部)函数的 自身变量/激活对象(own variable/activation object)

``` js
Scope = AO + [[Scope]]

Scope = AO|VO + [[Scope]]

Scope = [AO].concat([[Scope]]);

foo.[[Scope]] = [ // 父变量对象列表
  globalContext.VO // === Global
];

fooContext.Scope = foo.[[Scope]] + fooContext.AO // i.e.: 父变量对象列表 + 自身变量/激活对象

fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
];
```

``` js
fooContext.AO = {
  y: undefined // undefined – 进入上下文的时候是20 – at activation
};
```

``` js
foo.[[Scope]] = [
  globalContext.VO // === Global
];
```

[[scope]]在函数创建时被存储－－静态（不变的）,函数的[[scope]]属性。

``` js
//伪代码
//js代码默认进入全局执行环境，所以foo在初始时就被定义
foo.[[scope]]={
  GO:{ // globalContext.VO
    this:window,
    window:{...},
    document:{...},
    a:undefined   //此处是预编译，所以a并没有赋值
    ....
  }
}

//当进入foo执行环境时，bar函数才被定义
bar.[[scope]]={
  AO(foo):{
    this:window,
    arguments:[],
    b:undefined
  },
  GO:{
    this:window,
    window:{...},
    document:{...},
    a:1
  }
}
```

``` js
var x = 10;

function foo() {
  var y = 20;

  function bar() {
    var z = 30;
    alert(x +  y + z);
  }

  bar();
}

foo(); // 60
```

``` js
globalContext.VO === Global = {
  x: 10
  foo: <reference to function>
};
```

``` js
foo.[[Scope]] = [
  globalContext.VO
];
```

``` js
fooContext.AO = {
  y: 20,
  bar: <reference to function>
};
```

``` js
fooContext.Scope = fooContext.AO + foo.[[Scope]] // i.e.:

fooContext.Scope = [
  fooContext.AO,
  globalContext.VO
];
```
