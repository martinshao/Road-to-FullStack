# 前端编程题目大全

### 高阶函数实现AOP（面向切面编程）

``` js
    Function.prototype.before = function (beforefn) {
        let _self = this; // 缓存原函数的引用
        return function () { // 代理函数
            beforefn.apply(this, arguments); // 执行前置函数
            return _self.apply(this, arguments); // 执行原函数
        }
    }

    Function.prototype.after = function (afterfn) {
        let _self = this;
        return function () {
            let set = _self.apply(this, arguments);
            afterfn.apply(this, arguments);
            return set;
        }
    }

    let func = () => console.log('func');
    func = func.before(() => {
        console.log('===before===');
    }).after(() => {
        console.log('===after===');
    });

    func();

```

### 阶乘

```
const factorial1 = n => {
    if (n <= 1) return 1
    return n * factorial1(n - 1)
}

// 尾递归优化
const factorial2 = (n, total = 1) => {
    if (n <= 1) return total
    return factorial2(n - 1, total * n)
}
```

### 二分查找

第一问：
暂时性死区，let const都有这样的问题，换成var就没有问题了

换成var之后的输出
1
2
underfined（var的变量提升）
underfined（var的变量提升）

1
2
11（闭包）
22（闭包）

第二问：call的this硬性绑定
underfined （call绑定，此时this是{}，没有a属性）
underfined （call绑定，此时this是{}，没有b属性）
underfined（var的变量提升）
underfined（var的变量提升）

underfined （闭包+call绑定）
underfined （闭包+call绑定）
11
22

第三问：call的this硬性绑定，绑定方式不同

1
2
underfined（var的变量提升）
underfined（var的变量提升）
此结果同第一问相同

1（call绑定失效）
2（call绑定失效）
11（闭包）
22（闭包）
