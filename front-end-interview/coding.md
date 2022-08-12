# FE 面试编程题

## JavaScript 相关

#### 实现深拷贝

#### 实现可链式调用的类

#### 判断一个对象是否为空对象

#### 实现 `Function.prototype.bind`

#### 实现 `Function.prototype.apply`

#### 实现 `Function.prototype.call`

#### 实现 防抖

#### 实现 节流

#### 实现 new 操作符功能

#### 类数组转化为数组

## Typescript 相关

## 异步编程相关

#### 实现 `Promise`

#### promise 实现异步并发，并发数量可控

使用Promise实现：限制异步操作的并发个数，并尽可能快的完成任务。

<details>
<summary>具体细节</summary>
有8个图片资源的url，已经存储在数组urls中。

urls类似于['https://image1.png', 'https://image2.png', ....]

而且已经有一个函数function loadImg，输入一个url链接，返回一个Promise，该Promise在图片下载完成的时候resolve，下载失败则reject。

但有一个要求，任何时刻同时下载的链接数量不可以超过3个。

请写一段代码实现这个需求，要求尽可能快速地将所有图片下载完成。
</details>

#### 实现 mergePromise 函数

#### 使用 Promise 实现红绿灯功能

### 实现有并行限制的 Promise 调度器

#### 使用Promise封装异步加载图片功能

#### 使用setTimeout实现setInterval

#### 使用Promise实现每隔1秒输出1，2，3

#### 实现 Promise.all

## 函数式编程相关

#### 实现compose方法

#### 实现柯里化

## 数组结构转换相关

#### 实现一个对象的flatten方法

#### 实现transform函数，将对象转成类似树结构的数组

#### 层级关系转换

<details>
<summary>具体要求</summary>
以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：
 
原始 list 如下
 
``` js
let list = [
  { id: 1, name: "部门A", parentId: 0 },
  { id: 2, name: "部门B", parentId: 0 },
  { id: 3, name: "部门C", parentId: 1 },
  { id: 4, name: "部门D", parentId: 1 },
  { id: 5, name: "部门E", parentId: 2 },
  { id: 6, name: "部门F", parentId: 3 },
  { id: 16, name: "部门L", parentId: 3 },
  { id: 7, name: "部门G", parentId: 2 },
  { id: 8, name: "部门H", parentId: 4 },
];
 
const result = convert(list);
console.log(result);
```
</details>
<details>
<summary>答案</summary>

``` js
function convert(list, id = 0) {
  let res = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].parentId === id) {
      res.push(list[i]);
      list[i].children = convert(list, list[i].id);
    }
  }
  return res;
}
```

</details>

## 正则相关

#### 实现数字的千分位逗号分割

## 数据结构与算法题

#### 打印一下斐波那契数列

#### 堆排序

#### 归并排序

#### 希尔排序

#### 基数排序

#### 桶排序

#### 计数排序

#### 快速排序

#### 插入排序

#### 选择排序

#### 冒泡排序
