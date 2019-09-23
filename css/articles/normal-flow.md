# HTML的文档流(normal flow)详解

## 官方定义

> Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously. `Block-level boxes` participate in a `block formatting context`. `Inline-level boxes` participate in an `inline formatting context`.

官网中给出了很多关键字，首先我们对于关键字进行解读：

* `boxes`: 在文中意思是 **盒子模型**
* `normal flow`: 字面意思是 **正常流**，其实在国内就是指 **文档流**
* `formatting context`: 格式化上下文
* `Block-level boxes`: 块级盒子模型
* `Inline-level boxes`: 内联盒子模型
* `block formatting context`: 简写 `BFC` ，就是常说的块级格式上下文
* `inline formatting context`: 简写 `IFC` ，内联格式上下文

其中除了 `BFC` 、 `IFC` ，开发中常见的还有 `GFC` (网格布局格式化上下文)和 `FFC` (自适应格式化上下文)

> 


## 参考资料

* [W3C Normal flow][1]
* [MDN 视觉格式化模型][2]
* [MDN Block formatting context][3]
* [[布局概念] 关于CSS-BFC深入理解][4]
* [一篇文章了解HTML文档流(normal flow)][5]
* [Css文档流(Normal Flow)详细介绍][6]
* [CSS标准文档流][7]

[1]: https://www.w3.org/TR/CSS2/visuren.html#normal-flow
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model
[3]: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
[4]: https://juejin.im/post/5909db2fda2f60005d2093db
[5]: https://segmentfault.com/a/1190000012425858
[6]: https://blog.csdn.net/drdongshiye/article/details/77619572
[7]: https://www.jianshu.com/p/4921ba9e101d
