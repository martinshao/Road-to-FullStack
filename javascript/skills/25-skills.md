下面为大家介绍我在开发中常用的25个JavaScript单行代码，没有特别的顺序。
1.强制布尔值
要将变量强制转换为布尔值而不更改其值：

const myBoolean = !! myVariable;
!!null // false
!!undefined // false
!!false // false
!!ture // ture
!!"" // false
!!"string" // true
!!0 // false
!!1 // true
!!{} // true
!![] // true
2.基于某个条件为对象设置属性
要使用spread运算符有条件地在对象上设置属性：

const myObject = {... myProperty && {propName：myPoperty}};

let myProperty = 'Jhon'
const myObject = {...myProperty && {propName: myProperty}}; // {propName: "Jhon"}
let myProperty = ''
const myObject = {...myProperty && {propName: myProperty}}; // {}
如果myProperty结果为false，则 && 失败并且不设置新属性; 否则，如果不为空，&& 将设置新属性并覆盖原来的值。

3.合并对象
const mergedObject = { ...objectOne, ...objectTwo };

const mergedObject = { ...{name: 'Jhon', age: '18'}, ...{name1: 'jhon1', age1: '12'}};
// {name: "Jhon", age: "18", name1: "jhon1", age1: "12"}

const mergedObject = { ...{name: 'Jhon', age: '18'}, ...{name: 'jhon1', age:'12'}};
// {name: "jhon1", age: "12"}
支持无限制合并，但如果对象之间存在相同属性，则后面属性会覆盖前面属性。*请注意，这仅适用于浅层合并。

4.交换变量
要在不使用中间变量的情况下交换两个变量的值：

[varA，varB] = [varB，varA];
let a = 1;
let b = 2;
[a, b] = [b, a] // a = 2 b = 1
5.删除Boolean 为 false 值
const clean = dirty.filter(Boolean);
const clean = [0, false, true, undefined, null, '', 12, 15].filter(Boolean);
// [true, 12, 15]
这将删除值等于：null，undefined，false，0 和空字符串('')。

6.转换元素类型
要将Number元素转换为String元素：

const stringArray = numberArray.map(String);
const stringArray = [1, 2, 3].map(String);
["1", "2", "3"]
如果数组包含字符串，字符串原样保留。 这也可以用于将String元素转换为Number类型：

const numberArray = stringArray.map(Number);
const stringArray = ["1", "2", "3"].map(String);
// [1, 2, 3]
7.格式化对象为JSON代码
要以可读的格式显示JSON代码：

const formatted = JSON.stringify(myObj, null, 4);

const formatted = JSON.stringify({name: 'Jhon', age: 18, address: 'sz'}, null, 4);
/*
{
    "name": "Jhon",
    "age": 18,
    "address": "sz"
}
*/
该字符串化命令有三个参数。第一个是Javascript对象。第二个是可选函数，可用于在JSON进行字符串化时对其执行操作。最后一个参数指示要添加多少空格作为缩进以格式化JSON。省略最后一个参数，JSON将返回一个长行。如果myObj中存在循环引用，则会格式失败。


8.快速创建数字数组

要创建一个数组并用数字填充它，索引为零：

const numArray = Array.from(new Array(10), (x, i)=> i);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
9.随机生成六位数字验证码
const code = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
// 942377
10.身份证正则
const IDReg= /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
11.window.location.search 转 JS 对象
有时候我们会对url的查询参数即从问号 (?)后 开始的 URL（查询部分）进行转换

const searchObj = search => JSON.parse(`{"${decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);

// 假如请求url为
// 'https://www.baidu.com?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907'
// 那么 window.location.search 就为：
let search = '?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=js&rsv_pq=a86b5e5f0007bceb&rsv_t=1e1fAVan%2BVlnkhJHFB0BIGLdLM2slszYMJBTTfFkmyyBUzBpw0ggeuVDE50&rqlang=cn&rsv_enter=0&inputT=1287&rsv_sug3=5&rsv_sug1=3&rsv_sug7=101&rsv_sug2=0&rsv_sug4=1907'
searchObj(search)
格式化查询字符串得到如下对象：


12. JS 对象转 url 查询字符串
const objectToQueryString = (obj) => Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
objectToQueryString({name: 'Jhon', age: 18, address: 'beijing'})
// name=Jhon&age=18&address=beijing
13.获取数组交集
const similarity = (arr, values) => arr.filter(v => values.includes(v));
similarity([1, 2, 3], [1, 2, 4]); // [1,2]
14.检测设备类型
使用正则表达式来检测 navigator.userAgent 属性判断设备是在移动设备还是在台式机/笔记本电脑打开。

const detectDeviceType = () =>/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
15. 将数字转化为千分位格式
const toDecimalMark = num => num.toLocaleString('en-US');
toDecimalMark(12305030388.9087); // "12,305,030,388.909"
16 多维数组转一维数组
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
17.过滤对象数组
const reducedFilter = (data, keys, fn) =>data.filter(fn).map(el =>keys.reduce((acc, key) => {acc[key] =el[key];return acc;}, {}));
const data = [
  {
    id: 1,
    name: 'john',
    age: 24
  },
  {
    id: 2,
    name: 'mike',
    age: 50
  }
];

let a = reducedFilter(data, ['id', 'name'], item => item.age > 24); // [{ id: 2, name: 'mike'}]
18.驼峰字字符串格式化
转换驼峰拼写的字符串为特定格式。

使用 String.replace() 去除下划线，连字符和空格，并将驼峰拼写格式的单词转换为全小写。省略第二个参数 separator ，默认使用 _ 分隔符。

const fromCamelCase = (str, separator = '_') =>str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2').replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();

fromCamelCase('someDatabaseFieldName', ' '); // 'some database field name'
fromCamelCase('someLabelThatNeedsToBeCamelized', '-'); // 'some-label-that-needs-to-be-camelized'
fromCamelCase('someJavascriptProperty', '_'); // 'some_javascript_property'
19.是否为绝对地址
const isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

isAbsoluteURL('https://google.com'); // true
isAbsoluteURL('ftp://www.myserver.net'); // true
isAbsoluteURL('/foo/bar'); // false
20.获取两个日期相差天数

const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
21.数组去重
const deDupe = (myArray) => [... new Set(myArray)];
deDupe([1, 1, 2, 1, 3, 3, 4])
// [1, 2, 3, 4]
22.数组对象去重
const uniqueElementsBy = (arr, fn) =>arr.reduce((acc, v) => {if (!acc.some(x => fn(v, x))) acc.push(v);return acc;}, []);

uniqueElementsBy([{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}, {id: 1, name: 'Jhon'}], (a, b) => a.id == b.id)
// [{id: 1, name: 'Jhon'}, {id: 2, name: 'sss'}]
23. RGB 颜色转 16进制颜色
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');

RGBToHex(255, 165, 1); // 'ffa501'
24. 常用密码组合正则
const passwordReg = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]{8,20}$/;
// -长度8~20位字符，支持大小写字母、数字、符号三种字符中任意两种字符的组合
25. 判断dom元素是否具有某个className
const  hasClass = (el, className) => new RegExp(`(^|\\s)${className}(\\s|$)`).test(el.className);

[开发中常用的 25 个JavaScript 单行代码](https://zhuanlan.zhihu.com/p/70670769)