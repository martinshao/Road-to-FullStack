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