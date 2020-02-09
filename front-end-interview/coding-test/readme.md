# 关于面试中编程题目总结

总体来说，面试中的编程题目可以分为两大类，一类是手写源码，一类是算法。

1. 注意代码规范
2. 新变量和返回值
3. 循环、递归的选择
4. 考虑边界条件
5. 数组、字符串、对象常用API掌握
6. 常用特殊说明
7. 尝试使用ES6
8. 尝试多种解法，顺便考虑ES6的实现

### 一、注意代码规范

俗话说见字如见人，那么在面试的时候你的代码也可以说明很多问题。代码规范是自第一行代码就需要注意的事情。这里主要强调的就是：命名和格式的规范。

1. 命名规范
ECMAScript 规范中标识符采用驼峰大小写格式，驼峰命名法由小(大)写字母开始，后续每个单词首字母都大写。根据首字母是否大写，分为两种方式：

Pascal Case 大驼峰式命名法：首字母大写。eg：StudentInfo、UserInfo、ProductInfo
Camel Case 小驼峰式命名法：首字母小写。eg：studentInfo、userInfo、productInfo
标识符，则包括变量、函数名、类名、属性名和函数或类的参数，每个命名方法又略有不同，下面详细解释一下：

1.1 变量
命名方法：小驼峰式命名法。

命名规范：前缀应当是名词。(函数的名字前缀为动词，以此区分变量和函数)

命名建议：尽量在变量名字中体现所属类型，如:length、count等表示数字类型；而包含name、title表示为字符串类型。

eg:

// 好的命名方式
let maxCount = 10;
let tableTitle = 'LoginTable';
// 不好的命名方式
let setCount = 10;
let getTitle = 'LoginTable';
1.2 常量
命名方法：名称全部大写。

命名规范：使用大写字母和下划线来组合命名，下划线用以分割单词。

eg:

const MAX_COUNT = 10;
const URL = 'http://www.foreverz.com';
1.3 函数
命名方法：小驼峰式命名法。

命名规范：前缀应当为动词。

命名建议：可使用常见动词约定

动词	含义	返回值
can	判断是否可执行某个动作(权限)	函数返回一个布尔值。true：可执行；false：不可执行
has	判断是否含有某个值	函数返回一个布尔值。true：含有此值；false：不含有此值
is	判断是否为某个值	函数返回一个布尔值。true：为某个值；false：不为某个值
get	获取某个值	函数返回一个非布尔值
set	设置某个值	无返回值、返回是否设置成功或者返回链式对象
load	加载某些数据	无返回值或者返回是否加载完成的结果
eg:

// 是否可阅读
function canRead(): boolean {
  return true;
}
// 获取名称
function getName(): string {
  return this.name;
}
1.4 类 & 构造函数
命名方法：大驼峰式命名法，首字母大写。

命名规范：前缀为名称。

eg:

class Person {
  public name: string;
  constructor(name) {
    this.name = name;
  }
}
const person = new Person('mevyn');
1.5 类的成员
类的成员包含：

公共属性和方法：跟变量和函数的命名一样。

私有属性和方法：前缀为_(下划线)，后面跟公共属性和方法一样的命名方式。

eg:

class Person {
  private _name: string;
  constructor() { }
  // 公共方法
  getName() {
    return this._name;
  }
  // 公共方法
  setName(name) {
    this._name = name;
  }
}
const person = new Person();
person.setName('mervyn');
person.getName(); // ->mervyn

命名的时候需要考虑具体的功能。代码规范遵守
函数名称直接使用功能英文命名(这里你必须知道你要手写的函数要实现什么功能)
至于传递的参数，还有函数内部声明的一些数组，变量等，完全不要考虑太多，可以直接使用arr 和 arr+功能名称 简写。
其实直接可以使用 arr1，arr2 来代替，能区分开就好了,别在犹豫这种事浪费时间。

1. 起名字与具体功能考虑
起名字

手写函数的时候，我每次给参数或者函数起名字都要犹豫那么几秒。面试官还以为我不会写嘞!

代码规范遵守
函数名称直接使用功能英文命名(这里你必须知道你要手写的函数要实现什么功能)
至于传递的参数，还有函数内部声明的一些数组，变量等，完全不要考虑太多，可以直接使用arr 和 arr+功能名称 简写。
其实直接可以使用 arr1，arr2 来代替，能区分开就好了,别在犹豫这种事浪费时间。

2. 新变量与返回值
看完一道手写面试题，可以先看下是否需要声明新变量，需要返回的结果和结果类型等。

数组拍平 肯定需要返回一个数组，可以考虑在初期声明一个数组的方式，也可以考虑使用 map，fliter等函数直接返回。
对象深拷贝 肯定需要返回一个一个拷贝后的对象，在初期会声明一个空对象，最后返回这个处理过的对象。
很多情况可以声明新变量或者不声明新变量，都能解决问题，但是就要考虑到时间复杂度和空间复杂度了，先用一种实现就好。面试官会继续问你有没有其他方案的，嘿嘿。
3. 考虑是用循环？递归？
循环

for 循环

for 有三个表达式：①声明循环变量；②判断循环条件；③更新循环变量；　　　　三个表达式之间，用;分割，for 循环三个表达式都可以省略，但是两个“;”缺一不可。
for 循环的执行特点：先判断再执行，与 while 相同
for 循环三个表达式都可以有多部分组成，第二部分多个判断条件用&& ||连接，第一三部分用逗号分割；
for (var num =1; num<=10; num++) {
    document.write(num+" <br />"); //1 2 3 4 5 6 7 8 9 10
}
for in 循环

for-in 循环主要用于遍历对象 　　for() 中的格式：for(keys in object){} 　　keys 表示 obj 对象的每一个键值对的键！！所有循环中，需要使用obj[keys]来取到每一个值！！！

for-in 循环，遍历时不仅能读取对象自身上面的成员属性，也能延续原型链遍历出对象的原型属性 　　所以，可以使用 hasOwnProperty 判断一个属性是不是对象自身上的属性

obj.hasOwnProperty(keys)==true 表示这个属性是对象的成员属性，而不是原先属性。

//声明一个Peson类
function Person(){
    this.name = "kaola";
    this.age = 24;
    this.func1 = function(){
        
    }
}
//实例化这个类
var bei = new Person();
//使用for-in遍历这个对象
for(keys in bei){
    console.log(bei[keys])
}
for of 循环

ES6 借鉴 C++、Java、C# 和 Python 语言，引入了 for...of 循环，作为遍历所有数据结构的统一的方法。

一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。也就是说，for...of 循环内部调用的是数据结构的 Symbol.iterator 方法。

for...of 循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

递归

关于递归的详细内容可以看我的这篇文章，聊聊面试必考-递归思想与实战 文章中常用的递归手写代码都用写到。

4. 考虑界限
4.1 类型判断

★如何判断数据类型？怎么判断一个值到底是数组类型还是对象?”
三种方式，分别为 typeof、instanceof 和Object.prototype.toString.call()

typeof

通过 typeof操作符来判断一个值属于哪种基本类型。

typeof 'seymoe'    // 'string'
typeof true        // 'boolean'
typeof 10          // 'number'
typeof Symbol()    // 'symbol'
typeof null        // 'object' 无法判定是否为 null
typeof undefined   // 'undefined'

typeof {}           // 'object'
typeof []           // 'object'
typeof(() => {})    // 'function'
上面代码的输出结果可以看出，

null 的判定有误差，得到的结果 如果使用 typeof null得到的结果是object

操作符对对象类型及其子类型，例如函数（可调用对象）、数组（有序索引对象）等进行判定，则除了函数都会得到 object 的结果。

在对象的子类型和null情况下,可以看出typeOf对于判断类型还有一些不足。

instanceof

通过 instanceof 操作符也可以对对象类型进行判定，其原理就是测试构造函数的prototype 是否出现在被检测对象的原型链上。

[] instanceof Array            // true
({}) instanceof Object         // true
(()=>{}) instanceof Function   // true
复制代码注意：instanceof 也不是万能的。

举个例子：

let arr = []
let obj = {}
arr instanceof Array    // true
arr instanceof Object   // true
obj instanceof Object   // true
obj instanceof Array   // false
在这个例子中，arr 数组相当于 new Array() 出的一个实例，所以 arr.__proto__ === Array.prototype，又因为 Array属于 Object 子类型，即Array.prototype.__proto__ === Object.prototype，因此 Object 构造函数在 arr 的原型链上。所以 instanceof 仍然无法优雅的判断一个值到底属于数组还是普通对象。

还有一点需要说明下，有些开发者会说 Object.prototype.__proto__ === null，岂不是说 arr instanceof null 也应该为 true，这个语句其实会报错提示右侧参数应该为对象，这也印证 typeof null 的结果为 object 真的只是javascript中的一个bug 。

Object.prototype.toString() （推荐款）

可以说是判定 JavaScript 中数据类型的终极解决方法了，具体用法请看以下代码：

Object.prototype.toString.call({})              // '[object Object]'
Object.prototype.toString.call([])              // '[object Array]'
Object.prototype.toString.call(() => {})        // '[object Function]'
Object.prototype.toString.call('seymoe')        // '[object String]'
Object.prototype.toString.call(1)               // '[object Number]'
Object.prototype.toString.call(true)            // '[object Boolean]'
Object.prototype.toString.call(Symbol())        // '[object Symbol]'
Object.prototype.toString.call(null)            // '[object Null]'
Object.prototype.toString.call(undefined)       // '[object Undefined]'

Object.prototype.toString.call(new Date())      // '[object Date]'
Object.prototype.toString.call(Math)            // '[object Math]'
Object.prototype.toString.call(new Set())       // '[object Set]'
Object.prototype.toString.call(new WeakSet())   // '[object WeakSet]'
Object.prototype.toString.call(new Map())       // '[object Map]'
Object.prototype.toString.call(new WeakMap())   // '[object WeakMap]'
我们可以发现该方法在传入任何类型的值都能返回对应准确的对象类型。用法虽简单明了，但其中有几个点需要理解清楚：

该方法本质就是依托Object.prototype.toString()方法得到对象内部属性 [[Class]]
传入原始类型却能够判定出结果是因为对值进行了包装
null 和 undefined 能够输出结果是内部实现有做处理
对于类型判断，我们可以通过 Object.prototype.toString() 进行一个简单的封装,这样我们再判断类型的时候，直接使用 type 函数就可以了。

代码如下:

var type = function(data) {
      var toString = Object.prototype.toString;
      var dataType = toString
              .call(data)
              .replace(/\[object\s(.+)\]/, "$1")
              .toLowerCase()
      return dataType
};
Array.isArray()

Array.isArray 也可以判断传递参数是否是数组。需要注意的是这是 Array.isArray 是 ES 5.1 推出的，不支持 IE6~8，所以在使用的时候也应注意兼容问题。

出现不兼容问题解决办法
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
4.2 空值判断

空值判断的重要性

  if([]) {
    console.log('true');
  } else {
    consoel.log('false');
  }
  // res：true
  
  if({}) {
    console.log('true');
  } else {
    consoel.log('false');
  }
  // res：true
看这段代码，不知道有没有小伙伴会认为输出false，以上对象和数组虽然为空，但是会被转换为ture，所以在写一些判断条件时候要格外注意。

空数组判断

数组为空很简单，通过上面的类型判断是数组类型，然后它的length>0即可

空对象判断

Object.getOwnPropertyNames()

使用Object.getOwnPropertyNames()。返回值是对象中属性明名成的数组

var obj = {}
Object.getOwnPropertyNames(obj).length === 0; // true
json 对象转换为字符串

将json对象转换为字符串，然后比较该字符串与"{}"是否相等

var obj = {};
var a = JSON.stringify(obj);
a === "{}"; // true
// a === {}; // false
for...in... 循环判断

var obj = {};

function judgeObj(obj) {
  for(let key in obj) {
    return false
  }
  return true
};

judgeObj(obj); // true
Object.keys()

使用Object.keys()。ES6的新方法，返回值同样是属性名组成的数组

var obj = {}
Object.keys(obj).length === 0; // true
直接使用对象属性判断 前提是要确定如果obj不为空，一定会包含name属性

var obj = {};

obj && obj.name ? '不为空' : '为空'; //
4.3 等号使用

比较过程：

双等号==：
（1）如果两个值类型相同，再进行三个等号(===)的比较

（2）如果两个值类型不同，也有可能相等，需根据以下规则进行类型转换在比较：

1）如果一个是null，一个是undefined，那么相等

2）如果一个是字符串，一个是数值，把字符串转换成数值之后再进行比较



三等号===:
（1）如果类型不同，就一定不相等

（2）如果两个都是数值，并且是同一个值，那么相等；如果其中至少一个是NaN，那么不相等。（判断一个值是否是NaN，只能使用isNaN( ) 来判断）

（3）如果两个都是字符串，每个位置的字符都一样，那么相等，否则不相等。

（4）如果两个值都是true，或是false，那么相等

（5）如果两个值都引用同一个对象或是函数，那么相等，否则不相等

（6）如果两个值都是null，或是undefined，那么相等

5. 数组 字符串 对象 常用函数掌握
5.1 数组部分常用函数

splice函数(改变原始数组)

有向数组指定位置添加元素的功能
Array.splice(begin, deleteCount, addItem1, addItem2...)

// a的初始值：[1,2,3,4,5]

var b = arr.splice(1,2)
// a: [1,4,5]
// b: [2,3]

var c = arr.splice(1,2,777,888)
// a: [1,777,888,4,5]
// b: [2,3]
slice 函数(不改变原数组，创建新数组)

slice() 方法将数组中一部分元素浅复制存入新的数组对象，并且返回这个数组对象。

语法：arr.slice([start[, end]])

参数 start 指定复制开始位置的索引，end如果有值则表示复制结束位置的索引（不包括此位置）。

如果 start 的值为负数，假如数组长度为 length，则表示从 length+start 的位置开始复制，此时参数 end 如果有值，只能是比 start 大的负数，否则将返回空数组。

slice方法参数为空时，同concat方法一样，都是浅复制生成一个新数组。

var array = ["one", "two", "three","four", "five"];
console.log(array.slice()); // ["one", "two", "three","four", "five"]
console.log(array.slice(2,3)); // ["three"]
浅复制 是指当对象的被复制时，只是复制了对象的引用，指向的依然是同一个对象。下面来说明slice为什么是浅复制。

var array = [{color:"yellow"}, 2, 3];
var array2 = array.slice(0,1);
console.log(array2); // [{color:"yellow"}]
array[0]["color"] = "blue";
console.log(array2); // [{color:"bule"}]
由于slice是浅复制，复制到的对象只是一个引用，改变原数组array的值，array2也随之改变。

同时，稍微利用下 slice 方法第一个参数为负数时的特性，我们可以非常方便的拿到数组的最后一项元素，如下：

console.log([1,2,3].slice(-1));//[3]

join 函数

join() 方法将数组中的所有元素连接成一个字符串。

语法 arr.join('xxx')

var b = arr.join(','); // b: '1,2,3'
var b = arr.join('*'); // b: '1*2*3'
push 函数

数组中添加值。

concat 函数

concat() 方法将传入的数组或者元素与原数组合并，组成一个新的数组并返回。

indexOf函数

indexOf() 方法用于查找元素在数组中第一次出现时的索引，如果没有，则返回-1。

语法：arr.indexOf(element, fromIndex=0)

element 为需要查找的元素。

fromIndex 为开始查找的位置，缺省默认为0。如果超出数组长度，则返回-1。如果为负值，假设数组长度为length，则从数组的第 length + fromIndex项开始往数组末尾查找，如果length + fromIndex<0 则整个数组都会被查找。

indexOf使用严格相等（即使用 === 去匹配数组中的元素）。

var array = ['abc', 'def', 'ghi','123'];
console.log(array.indexOf('def')); // 1
console.log(array.indexOf('def',-1)); // -1 此时表示从最后一个元素往后查找,因此查找失败返回-1
console.log(array.indexOf('def',-4)); // 1 由于4大于数组长度,此时将查找整个数组,因此返回1
console.log(array.indexOf(123)); // -1, 由于是严格匹配,因此并不会匹配到字符串'123'
includes 函数

includes() 方法基于ECMAScript 2016（ES7）规范，它用来判断当前数组是否包含某个指定的值，如果是，则返回 true，否则返回 false。

语法：arr.includes(element, fromIndex=0)

element 为需要查找的元素。

fromIndex 表示从该索引位置开始查找 element，缺省为0，它是正向查找，即从索引处往数组末尾查找。

var array = [-0, 1, 2];
console.log(array.includes(+0)); // true
console.log(array.includes(1)); // true
console.log(array.includes(2,-4)); // true
以上，includes似乎忽略了 -0 与 +0 的区别，这不是问题，因为JavaScript一直以来都是不区分 -0 和 +0 的。

你可能会问，既然有了indexOf方法，为什么又造一个includes方法，arr.indexOf(x)>-1不就等于arr.includes(x)？看起来是的，几乎所有的时候它们都等同，唯一的区别就是includes能够发现NaN，而indexOf不能。

var array = [NaN];
console.log(array.includes(NaN)); // true
console.log(arra.indexOf(NaN)>-1); // false
(这里大家可以考虑下 indexOf 和 includes 的效率谁高，和底层实现)

★数组函数有很多，上面只列举了常用的几个，发现一篇很全的数组函数文章，非常棒，感谢作者分享，推荐给大家：http://louiszhai.github.io/2017/04/28/array/”
5.2 字符串常用函数

split 函数

把字符串分割称数组
不改变原始字符串
string.split(separator,limit)
substr 函数

substr() 方法返回字符串指定位置开始的指定数量的字符。

语法：str.substr(start[, length])

start 表示开始截取字符的位置，可取正值或负值。取正值时表示start位置的索引，取负值时表示 length+start位置的索引。

length 表示截取的字符长度。

var str = "Yesterday is history. Tomorrow is mystery. But today is a gift.";
console.log(str.substr(47)); // today is a gift.
console.log(str.substr(-16)); // today is a gift.
★数组函数有很多，上面只列举了常用的几个，发现一篇很全的字符串函数文章，非常棒，感谢作者分享，推荐给大家：http://louiszhai.github.io/2016/01/12/js.String/#substr”
5.3 对象的常用函数

Object.prototype.hasOwnProperty(prop)

该方法仅在目标属性为对象自身属性时返回true,而当该属性是从原型链中继承而来或根本不存在时，返回false。

var o = {prop:1};
o.hasOwnProperty('prop'); // true
o.hasOwnProperty('toString'); // false
o.hasOwnProperty('formString'); // false
Object.create(obj, descr) (ES5)

该方法主要用于创建一个新对象，并为其设置原型，用（上述）属性描述符来定义对象的原型属性。

var parent = {hi: 'Hello'};
var o = Object.create(parent, {
    prop: {
        value: 1
    }
});
o.hi; // 'Hello'
// 获得它的原型
Object.getPrototypeOf(parent) === Object.prototype; // true 说明parent的原型是Object.prototype
Object.getPrototypeOf(o); // {hi: "Hello"} // 说明o的原型是{hi: "Hello"}
o.hasOwnProperty('hi'); // false 说明hi是原型上的
o.hasOwnProperty('prop'); // true 说明prop是原型上的自身上的属性。
现在，我们甚至可以用它来创建一个完全空白的对象，这样的事情在ES3中可是做不到的。

var o = Object.create(null);
typeof o.toString(); // 'undefined'
★数组函数有很多，上面只列举了常用的几个，发现一篇很全的对象函数文章，非常棒，感谢作者分享，推荐给大家：https://www.lxchuan12.cn/js-object-api”
6. 常用特殊说明
6.1 arguments 类似数组对象

什么是类似数组对象，举个例子:

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
类数组转换的几种方式

ES6 扩展运算符进行转换

var arr1 = [...arrayLike]; // ['a','b','c']
ES6 中的 Array.from

let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
Array.from() 的另一个应用是，将字符串转为数组，然后返回字符串的长度。

function countSymbols(string) {
  return Array.from(string).length;
}
ES5中 Array.prototype.slice.call()

function test(a,b,c,d)
   {
      var arg = Array.prototype.slice.call(arguments,1);
      alert(arg);
   }
   test("a","b","c","d"); //b,c,d
Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）

第一个参数是context（就是上下文的意思），用来替换对象函数中的this
第二个参数是传递给对象函数的参数
6.2 高阶函数使用

高阶函数相关内容可以看这篇文章。【JS必知必会】高阶函数详解与实战

在实现无限叠加，数组拍平，去重等都可以用到高阶函数。

7. 向面试官证明 ES6 也会
让你手写代码的时候，可以考虑一下使用 ES6 方式如何简洁实现。(这里大家可以去看一下ES6的扩展运算符...，set集合,箭头函数等常用的ES6知识点，附上ES6阮一峰老师书籍学习地址：http://es6.ruanyifeng.com/)

8. 练习一下
Node.js 中有一个queryString模块，可以实现将 urlStr 主机地址后面的参数转化为对象。

let urlStr = 'http://www.inode.club?name=koala&study=js&study=node';
转换结果如下:

{ name: 'koala', study: [ 'js', 'node' ] }
代码实现

你可以现自己实现一下，看完本篇想一下流程

let urlStr = 'http://www.inode.club?name=koala&study=js&study=node'
// 参数转成对象
function queryString(request){
    let params = request.split('?')[1];
    let param = params.split('&');
    let obj = {};
    for (let i = 0;i<param.length;i++){
        let paramsA = param[i].split('=');
        let key = paramsA[0];
        let value = paramsA[1];
        if(obj[key]){
            obj[key] = Array.isArray(obj[key])?obj[key]:[obj[key]];
            obj[key].push(value);
        }else{
            obj[key] = value;
        }
    }
    return obj;
}
console.log(queryString(urlStr));
总结
本文是一个应对手写代码的学习大纲，一些函数并没有全部列全，但是大家有时间按照大纲复习一遍，再去看一些常考的手写代码问题，个人感觉能好记而且清晰了很多，希望本文能对大家有所帮助。