# JavaScript基础之变量类型

学习一门语言，掌握它的变量类型是最基础的一面。从另外的角度，也是最重要的角度，因为开发始终离不开声明变量，处理变量。

我们在学习JavaScript变量类型时，通常会提到一个名词 鸭子类型 当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。

## JavaScript变量类型思维导图

![variable type](../_assets/JavaScript-data.png "variable type")

## 概述

> ECMAScript包括两个不同类型的值：基本数据类型和引用数据类型。
> 基本数据类型指的是简单的数据段，引用数据类型指的是有多个值构成的对象。
> 当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值。
> 到目前为止，我们看到的大多数引用类型值都是Object类型的实例。  
><p align="right"> -------《JavaScript高级程序设计》</p>

按照最新的ECMAScript规范制定的那样，在JavaScript中有9中变量类型(如果以后面试再遇到类似的问题，可以理直气壮的说9种)

* 6种特殊基本类型(primitive value)：undefined、Boolean、Number、String、BigInt、Symbol
* null作为一种特殊的基本类型(special primitive value)。如果对象没有被继承实现，就表现为null
* Object 特殊的引用类型数据结构，用于被继承实现各种内置类型，包装类型等。
* Function 特殊的引用类数据结构

``` js
undefined : typeof instance === "undefined"
Boolean : typeof instance === "boolean"
Number : typeof instance === "number"
String : typeof instance === "string"
BigInt : typeof instance === "bigint"
Symbol : typeof instance === "symbol"

null : typeof instance === "object"

Object : typeof instance === "object"
Function : typeof instance === "function"
```


## 存储空间比较

JavaScript的数据按照存储方式的不同，一般会分为两种，一种存在栈内存中，一种存在堆内存中。

JS的内存空间分为栈(stack)、堆(heap)、池(一般也会归类为栈中)。
栈是一种后入先出的线性表数据结构。一般数据存储的时候是连续的，并且大小空间固定。这也是为什么null是object类型却属于基本数据类型。
堆是一种经过排序的树形数据结构，每个结点都有一个值。
它的存取数据的方式，与书架与书非常相似。我们不关心书的放置顺序是怎样的，只需知道书的名字就可以取出我们想要的书了。

javascript的引用数据类型是保存在堆内存中的对象。与其他语言的不同是，你不可以直接访问堆内存空间中的位置和操作堆内存空间。只能操作对象在栈内存中的引用地址。  
所以，引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存中堆内存中的对象。

![save type](../_assets/20191016202804.png "save type")

## 拷贝方式的不同

不同数据结构存储的方式不同，意味着copy方式也不同。我们通常按照存储方式的不同区分js的数据类型为基本数据类型和引用数据类型，这么做也是为了区分拷贝方式的不同。

**undefined、Boolean、Number、String、BigInt和Symbol。**都属于基本数据类型，是按值访问的，因为可以直接操作保存在变量中的实际值。

在实际的拷贝过程中，也是开辟新的内存空间，复制一份相同的副本存储在新内存空间中，如下示例：

``` js
  let num1 = 10
  let num2 = a;
  num2 = 20;
  console.log(num1); // 10值
```

下图演示了这种基本数据类型赋值的过程：

备注：这其中 null 比较特殊，它属于特殊基本类型。

![save type](../_assets/20200803173733.png "save type")

基本上所有对象类型就是引用类型，引用类型的拷贝特点就是复制引用。

![save type](../_assets/20200803173800.png "save type")

通过代码说明就是浅复制的情况下，对于变量的复制只是简单的复制了引用地址，而两个变量的引用地址却同时指向了堆内存中的同一个对象。

``` js
  const person1 = new Object();
  const person2 = person1;
  person2.name = "Jack";
  console.log(person1.name); // Jack
```

关于如何解决浅复制带来的问题，下面会有方案。

## 总结区别

### A.声明变量时不同的内存分配：

1. 原始值：存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。这是因为这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 – 栈中。这样存储便于迅速查寻变量的值。
2. 引用值：存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存地址。
3. 这是因为：引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。

### B.不同的内存分配机制也带来了不同的访问机制

1. 在javascript中是不允许直接访问保存在堆内存中的对象的，所以在访问一个对象时，
2. 首先得到的是这个对象在堆内存中的地址，然后再按照这个地址去获得这个对象中的值，这就是传说中的按引用访问。
3. 而原始类型的值则是可以直接访问到的。

### C.复制变量时的不同

1. 原始值：在将一个保存着原始值的变量复制给另一个变量时，会将原始值的副本赋值给新变量，此后这两个变量是完全独立的，他们只是拥有相同的value而已。
2. 引用值：在将一个保存着对象内存地址的变量复制给另一个变量时，会把这个内存地址赋值给新变量，
也就是说这两个变量都指向了堆内存中的同一个对象，他们中任何一个作出的改变都会反映在另一个身上。
（这里要理解的一点就是，复制对象时并不会在堆内存中新生成一个一模一样的对象，只是多了一个保存指向这个对象指针的变量罢了）。多了一个指针

### D.参数传递的不同（把实参复制给形参的过程）

首先我们应该明确一点：**ECMAScript中所有函数的参数都是按值来传递的。**  
但是为什么涉及到原始类型与引用类型的值时仍然有区别呢？还是因为内存分配时的差别。 　
1. 原始值：只是把变量里的值传递给参数，之后参数和这个变量互不影响。
2. 引用值：对象变量它里面的值是这个对象在堆内存中的内存地址，这一点你要时刻铭记在心！
因此它传递的值也就是这个内存地址，这也就是为什么函数内部对这个参数的修改会体现在外部的原因了，因为它们都指向同一个对象。

## null和undefined区别

在JavaScript中存在这样两种原始类型:Null与Undefined。这两种类型常常会使JavaScript的开发人员产生疑惑，在什么时候是Null，什么时候又是Undefined?  
Undefined类型只有一个值，即undefined。当声明的变量还未被初始化时，变量的默认值为undefined。  
Null类型也只有一个值，即null。null用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。

``` js
var oValue;  
console.info(oValue == undefined); //output "true"  
```

这段代码显示为true,代表oVlaue的值即为undefined，因为我们没有初始化它。

``` js 
console.info(null == document.getElementById('notExistElement'));  
```

当页面上不存在id为"notExistElement"的DOM节点时，这段代码显示为"true"，因为我们尝试获取一个不存在的对象。

``` js
alert(typeof undefined); //output "undefined"  
alert(typeof null); //output "object"  
```

第一行代码很容易理解，undefined的类型为Undefined；第二行代码却让人疑惑，为什么null的类型又是Object了呢？其实这是JavaScript最初实现的一个错误，后来被ECMAScript沿用下来。在今天我们可以解释为，null即是一个不存在的对象的占位符，但是在实际编码时还是要注意这一特性。

``` js
alert(null == undefined); //output "true"  
```

ECMAScript认为undefined是从null派生出来的，所以把它们定义为相等的。但是，如果在一些情况下，我们一定要区分这两个值，那应该怎么办呢？可以使用下面的两种方法。

``` js
alert(null === undefined); //output "false"  
alert(typeof null == typeof undefined); //output "false"  
```

使用typeof方法在前面已经讲过，null与undefined的类型是不一样的，所以输出"false"。而===代表绝对等于，在这里null === undefined输出false。

## 类型检测

类型检测是日常开发中常会遇到的一类问题，对于JavaScript变量类型的检测有这么几种方式：typeof、instanceof、constructor、prototype、特殊类。接下里我会一一介绍，这里非常琐碎，但是非常有用。

### typeof

typeof 操作符返回一个字符串，表示未经计算的操作数的类型。具体用法如下：
``` js
typeof operand
typeof(operand)
// operand 一个表示对象或原始值的表达式，其类型将被返回。
```
typeof 操作符是有一定局限性的，它返回的类型仅仅包括以下类型：

``` js
typeof undefined // "undefined"
typeof null      // "object"
typeof true      // "boolean"
typeof 13        // "number"
typeof 518n      // "bigint"
typeof 'shaw'    // "string"
typeof new Symbol(13) // "symbol"
typeof new Function() // "function"
typeof {name: 'shaw'} // "object"
```

这里typeof的局限性主要体现在了两个方面，一是将特殊原始类型 null 判定为对象，二是无法具体区分内置类型(Date、Array、RegExp等)

``` js
typeof null; //object
typeof [] ; //object
typeof new Date(); //object
typeof new RegExp(); //object
```

那么typeof的实现原理是什么呢？不同的对象底层都表示为二进制，其低位的 1-3 位用来存储类型信息，typeof 就是通过判断前三位的机器码来判定类型。判定规则如下:

000: 对象
110: 布尔
010: 浮点数
100: 字符串
1: 整数

有两个值比较特殊:


null(JSVAL_NULL)
null 的所有机器码为 0，因此 typeof null 为"object"


undefined(JSVAL_VOID)
用整数 −2^30(整数范围之外的数字)表示。


以下是 typeof 的引擎代码：

``` cpp
JS_PUBLIC_API(JSType)
   JS_TypeOfValue(JSContext *cx, jsval v)
   {
       JSType type = JSTYPE_VOID;// 初始化为undefined
       JSObject *obj;
       JSObjectOps *ops;
       JSClass *clasp;

       CHECK_REQUEST(cx);
       if (JSVAL_IS_VOID(v)) {
           type = JSTYPE_VOID;
       } else if (JSVAL_IS_OBJECT(v)) {
           obj = JSVAL_TO_OBJECT(v);
           if (obj &&
               (ops = obj->map->ops,
                ops == &js_ObjectOps
                ? (clasp = OBJ_GET_CLASS(cx, obj),
                   clasp->call || clasp == &js_FunctionClass)
                : ops->call != 0)) {
               type = JSTYPE_FUNCTION;
           } else {
               type = JSTYPE_OBJECT;
           }
       } else if (JSVAL_IS_NUMBER(v)) {
           type = JSTYPE_NUMBER;
       } else if (JSVAL_IS_STRING(v)) {
           type = JSTYPE_STRING;
       } else if (JSVAL_IS_BOOLEAN(v)) {
           type = JSTYPE_BOOLEAN;
       }
       return type;
   }
```

可以看到 typeof 首先判断值是不是 undefined(通过值是不是等于 JSVAL_VOID(−2^30)来判断)。
``` cpp
#define JSVAL_IS_VOID(v)  ((v) == JSVAL_VOID)
```
当判断为 object 类型后会作进一步判断，如果可以调用 call 或者内部属性[[Class]]标记为函数则为函数，因此 typeof 可以判断是不是函数。
``` cpp
clasp->call
clasp == &js_FunctionClass
```
对于 null，通过 JSVAL_IS_OBJECT 判断为 true 后，作进一步判断，不是函数，因此为 object。
``` cpp
#define JSVAL_IS_OBJECT(v)      (JSVAL_TAG(v) == JSVAL_OBJECT)
```

### instanceof

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
``` js
object instanceof constructor
// object 某个实例对象
// constructor 某个构造函数
```

``` js
[] instanceof Array; //true
[] instanceof Object; //true
new Date() instanceof Date;//true
new Date() instanceof Object;//true
function Person(){};
new Person() instanceof Person;//true
new Person() instanceof Object;//true
```

### Object.prototype.toString

``` js
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object Window]
```

## 变量复制

上面我们说了直接类型和引用类型在拷贝过程中的区别，引发一个问题是如何真是拷贝一个引用类型变量，而不仅仅是拷贝其引用地址。

这里就要涉及到两个概念：浅拷贝、深拷贝，


## 类型转换

JavaScript是一门动态语言，意味着在执行过程中发生类型转换是一件很正常的事情。我们将JavaScript中常见的类型转换分为显示转换(explicit conversion，Explicit Coercion)和隐式转换(implicit conversion)。

### 转换规则


隐式转换的过程发生的很隐蔽，并且让人防不胜防，在某些场景中却用处很大。首先明确一下四种隐式转换的规则

**ToString，ToNumber，ToBoolean，ToPrimitive**

#### ToString

这里所说的ToString可不是对象的toString方法，而是指其他类型的值转换为字符串类型的操作。

这里我们讨论null、undefined、布尔型、数字、数组、普通对象转换为字符串的规则。

* null：转为"null"
* undefined：转为"undefined"
* 布尔类型：true和false分别被转为"true"和"false"
* 数字类型：转为数字的字符串形式，如10转为"10"， 1e21转为"1e+21"
* 数组：转为字符串是将所有元素按照","连接起来，相当于调用数组的Array.prototype.join()方法，如[1, 2, 3]转为"1,2,3"，空数组[]转为空字符串，数组中的null或undefined，会被当做空字符串处理
* 普通对象：转为字符串相当于直接使用Object.prototype.toString()，返回"[object Object]"

``` js
String(null) // 'null'
String(undefined) // 'undefined'
String(true) // 'true'
String(10) // '10'
String(1e21) // '1e+21'
String([1,2,3]) // '1,2,3'
String([]) // ''
String([null]) // ''
String([1, undefined, 3]) // '1,,3'
String({}) // '[object Objecr]'
```

#### ToNumber

ToNumber指其他类型转换为数字类型的操作。

null： 转为0
undefined：转为NaN
字符串：如果是纯数字形式，则转为对应的数字，空字符转为0, 否则一律按转换失败处理，转为NaN
布尔型：true和false被转为1和0
数组：数组首先会被转为原始类型，也就是ToPrimitive，然后在根据转换后的原始类型按照上面的规则处理，关于ToPrimitive，会在下文中讲到
对象：同数组的处理

``` js
Number(null) // 0
Number(undefined) // NaN
Number('10') // 10
Number('10a') // NaN
Number('') // 0 
Number(true) // 1
Number(false) // 0
Number([]) // 0
Number(['1']) // 1
Number({}) // NaN
```

#### ToBoolean

ToBoolean指其他类型转换为布尔类型的操作。

js中的假值只有false、null、undefined、空字符、0和NaN，其它值转为布尔型都为true。

``` js
Boolean(null) // false
Boolean(undefined) // false
Boolean('') // flase
Boolean(NaN) // flase
Boolean(0) // flase
Boolean([]) // true
Boolean({}) // true
Boolean(Infinity) // true
```

#### ToPrimitive

ToPrimitive指对象类型类型（如：对象、数组）转换为原始类型的操作。



### 显示转换

类似的API还包括：parseInt()、parseFloat()、String()、Boolean()、obj.toString()等

常见的显示转换常用API完成，如下：

``` js
const a = Number('25')
const a = Boolean('25')
const a = String(25)
```

对象与原始类型相等比较，对象类型会依照 ToPrimitive 规则转换成原始类型的值进行比较。

### 隐式转换

* 取反操作符 !
* 条件判断
* 宽松比较操作符 '=='
* 计算操作符，常见 '+' '-'
* . 点号操作符
* 关系运算符比较

#### 取反操作符 !

取反操作符特别强大，在我们实际开发中运用也非常广泛，可以把非boolean的变量强制转换成boolean类型变量

``` js
!0
!12
![]
!{}
!null
!undefined
```

#### 条件判断

```
if (true)
if ({})
if ([])
if (42)
if(null)
if(undefined)
if ("0")
if ("false")
if (new Date())
if (-42)
if (12n)
if (3.14)
if (-3.14)
if (Infinity)
if (-Infinity)
```

#### 比较操作符

我们知道比较操作符有两种，'==' 宽松比较 和 '===' 严格比较，这两者之间是有区别的。

* '==='：严格相等运算符，不会发生类型转换，必须要数据类型和值完全一致
* '=='：宽松相等运算符比较特殊一点，隐式转换的发生也是有条件的：
  * 左右两边是null 或 undefined ：没有隐式转换，无条件返回ture
  * 左右都是是NaN：没有隐式转换，NaN和任何数字都不相等，无条件返回false
  * 左右都是string,boolean,number：有隐式转换，会将number数据转换成number
  * 左右或是引用类型：对象类型会依照 ToPrimitive 规则转换成原始类型的值进行比较
  * 左右都是引用类型：规则是只比较 reference ，只有reference 相同时返回 true

``` js
[] == []  // false
{} == {}  // false
[] != []  // true

[] == 0
'0' == 0

!0 // true
!"0" // false
!"false" // false

new Array(3) === ",,"
```

#### 计算操作符

``` js
"1" + 5 === "15"
1 + "5" === "15"
1 - "5" === -4

{} + 1 === 1
[] + 1 === '1'
```

### 假值

在见识了JavaScript的类型转换之后，我们隐秘的发现一类日常开发中十分常用到的情况，就是boolean类型的转换。

JavaScript中有 8 个值为“假”，这8个值是

``` js
false
0
-0
0n
''
null
undefined
NaN
```

## 参考文章

* [从一道面试题说起—js隐式转换踩坑合集](https://juejin.im/post/6844903694039777288)
* [带你撸一遍JS隐式转换细则](https://juejin.im/post/6844903934876745735)
* [js隐式转换相关知识](https://zhuanlan.zhihu.com/p/38976424)
* [js中比较运算符隐式类型转换](https://segmentfault.com/a/1190000018637123)