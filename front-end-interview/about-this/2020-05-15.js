function Foo() {
    getName = function () {
        console.log(1)
    };
    console.info(this)
    return this;
}

// getName();  not defined 函数提升了，但是没有赋值

Foo.getName = function () {
    console.log(2)
}
Foo.prototype.getName = function () {
    console.log(3)
}

getName = function () { // 这个挂载在window对象了
    console.log(4)
}

Foo.getName(); // 2 函数也是对象，getName属性挂载在Foo对象上
getName(); // 4 执行的是挂载在window对象上的getName方法
Foo().getName()
// 1 实际调用window.Foo(),this默认绑定的是window对象，Foo()执行的时候，getName声明时候绑定在了window对象，
// 所以window原先绑定的getName()方法被覆盖了，再次调用window.getName()方法输出为1
getName() // 1 原因如上
Foo.getName(); // 2 原因如上
new Foo().getName(); // 3 new Foo()创造出一个新实例，然后会沿着原型链寻找getName方法，并执行。最后找到构造函数Foo原型上的getName方法执行

