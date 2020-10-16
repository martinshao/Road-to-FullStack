# html 页面渲染过程

1.解析 html 文件，创建 DOM 树
　　自上而下解析，遇到任何样式（link、style）和脚本（script）都会阻塞
　　 1）css 加载不会阻塞 html 文件的解析，但会阻塞 dom 的渲染
　　 2）css 加载会阻塞后面 js 语句的执行
　　 3）js 会阻塞 html 的解析和渲染
　　 4）没有 defer 和 async 标签的 script 会立即加载并执行
　　 5）有 async 标签的 js，js 的加载执行和 html 的解析和渲染并行
　　 6）有 defer 标签的 js，js 的加载和 html 的解析和渲染并行，但会在 html 解析完成后执行,在触发 DOMContentLoaded 事件前执行
　　 7）DOMContentLoaded 和 onload 的区别：DOMContentLoaded 在 html 解析完毕后执行，loload 在页面完全加载完成后执行（包括样式和图片） 2.解析 css，生成 CSSOM，css 对象模型
3.dom 和 css 合并，构建渲染树（Render Tree） 4.布局（Layout）和绘制（Paint），重绘（repaint）和重排（reflow/回流）
　　 1）重绘：根据元素的新属性重新绘制，使元素呈现新的外观
　　 2）重排：当渲染树中的一部分因为元素的规模尺寸，布局，隐藏等改变而需要重新构建
　　 3）重排必定会引发重绘，但重绘不一定会引发重排

补充：
监听资源加载完成有四种方式

```js
window.onload = function(){....}

window.addEventListener("load",function(){....});

document.body.onload = function(){....}

<body onload = "load()">
```

## 参考文章

* [【干货】十分钟读懂浏览器渲染流程](https://blog.csdn.net/chanzhi2016/article/details/79345565)
* [浏览器渲染原理、渲染阻塞、帧原理一次性说完](https://www.xuanbiyijue.com/2020/07/25/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E5%8E%9F%E7%90%86%E3%80%81%E6%B8%B2%E6%9F%93%E9%98%BB%E5%A1%9E%E3%80%81%E5%B8%A7%E5%8E%9F%E7%90%86%E4%B8%80%E6%AC%A1%E6%80%A7%E8%AF%B4%E5%AE%8C/)