# JavaScript执行机制深度解析——浏览器的Event Loop模型详解

在前面的文章，我大致的讲解了JavaScript如何利用Event Loop模型解决单线程运行利用系统资源不充分问题。但我们知道目前JavaScript运行环境有浏览器和Node，换句话说两者都内置了JS引擎，但是在执行Event Loop模型时，两者是不一样的。浏览器的 Event Loop 遵循的是 HTML5 标准，而 NodeJs 的 Event Loop 遵循的是 libuv。

本文主要对浏览器端的对于Event Loop模型实现的细节的。先看HTML5 标准对于事件循环的解释：
> 为了协调事件（event），用户交互（user interaction），脚本（script），渲染（rendering），网络（networking）等，用户代理（user agent）必须使用事件循环（event loops）。  
> 有两类事件循环：一种针对浏览上下文（browsing context），还有一种针对worker（web worker）。

事件循环机制的重点又是任务队列机制：
* 一个事件循环有一个或者多个任务队列（task queues）。任务队列是task的有序列表，task是调度Events，Parsing，Callbacks，Using a resource，Reacting to DOM manipulation这些任务的算法;
* 每个任务都来自一个特定的任务源（task source）(比如鼠标键盘事件)。来自同一个特定任务源且属于特定事件循环的任务必须被加入到同一个任务队列中，来自不同任务源的任务可以放在不同的任务队列中;
* 浏览器调用这些队列中的任务时采取这样的做法: 相同队列中的任务按照先进先出的顺序, 不同的队列按照提前设置的队列优先级来调用. 例如，用户代理可以有一个用于鼠标和键盘事件的任务队列（用户交互任务源），另一个用于其他任务。然后，用户代理75%概率调用键盘和鼠标事件任务队列，25%调用其他队列, 这样的话就保持界面响应而且不会饿死其他任务队列. 但是相同队列中的任务要按照先进先出的顺序。也就是说单独的任务队列中的任务总是按先进先出的顺序执行，但是不保证多个任务队列中的任务优先级，具体实现可能会交叉执行。

上文概括为三句话：
1. 一个事件循环里有很多个任务队列（task queues）来自不同任务源，来源同一任务源的事件必须加入同一个任务队列。
2. 每一个任务队列里的任务是严格按照先进先出的顺序执行的，但是不同任务队列的任务的执行顺序是不确定的。
3. 浏览器有自己调度不同任务队列的方法。

> 另外值得重点说明的是：上文涉及到的Task都是我们日常所说的macrotask(宏任务)，上文标准针对的是宏任务，下文我将引出microtask(微任务)。

microtask queue 微任务队列

microtask不会和Task一起，而是会放在一个叫做microtask(微任务) queue中, 继续看标准:
> Each event loop has a microtask queue. A microtask is a task that is originally to be queued on the microtask queue rather than a task queue.  
> 每个事件循环都只有一个微任务队列。微任务最初是在微任务队列中，而不是任务队列中。

重点强调：任务队列可以有多个，但是微任务队列只有一个。

Task（又称为MacroTask,宏任务）和MicroTask（微任务）主要来源如下：

name | 111 | 222 | 333 | 444
:-: | :-: | :-: | :-: | :-:
aaa | bbb | ccc | ddd | eee|
fff | ggg| hhh | iii | 000|

api | 浏览器 | Node 
:-: | :-: | :-: 
I/O | yes | yes |

**macrotask**任务队列的来源有：
api| 浏览器 | Node 
 - | :-: | :-: 
I/O | ✅ | ✅
setTimeout | ✅| ✅
setInterval | ✅| ✅
setImmediate | ❌| ✅
UI rendering | ✅| ❌
requestAnimationFrame | ✅| ❌


**microtask**任务队列的来源有：
api | 浏览器 | Node 
:-: | :-: | :-:
process.nextTick | ❌| ✅
MutationObserver | ✅| ❌
Promise.then catch finally | ✅| ✅

总体来说, 浏览器端事件循环的一个回合(go-around或者叫cycle)就是:

从macrotask队列中(task queue)取一个宏任务执行, 执行完后, 取出所有的microtask执行.
重复回合

无论在执行macrotask还是microtask, 都有可能产生新的macrotask或者microtask, 就这样继续执行.

![alt text](../_assets/2655194155-5ab0a0c60c00b.png "JavaScript call stack ")


参考资料：
* [浏览器中的事件循环机制][1]
* [什么是浏览器的事件循环（Event Loop）？][2]


[1]: https://segmentfault.com/a/1190000012748907
[2]: https://segmentfault.com/a/1190000010622146