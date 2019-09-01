# JavaScript执行机制深度解析——执行上下文ES3规范和ES5规范

在我们开始研究JavaScript的执行上下文时，希望能够先普及一个知识。

当我们开始真正研究执行上下文内部究竟发生了什么的时候，就不得不接触一些专业名词，，Execution Context(执行环境或执行上下文)，Context Stack (执行栈)，Variable Object(VO: 变量对象)，Active Object(AO: 活动对象)，LexicalEnvironment（词法环境），VariableEnvironment（变量环境）等，特别是关于 VO,AO以及LexicalEnvironment，VariableEnvironment的区别很多文章都没有涉及到。

后来了解到EC只是一个规范，对于规范的实践从时间和空间上都是不同的，我们常说的VO、AO是基于ECMAscript 3.X的标准实践的，另外LexicalEnvironment、VariableEnvironment则是出自ECMAscript 5.X的准备实践的。

两个标准最大的不同在于EC创建的时候：

我们现在知道每次调用函数时，javascript 引擎都会创建一个新的执行环境，而如何创建这一系列的执行环境呢，答案是执行器会分为两个阶段来完成， 分别是创建阶段和激活(执行)阶段。而即使步骤相同但是由于规范的不同，每个阶段执行的过程有很大的不同。

### ES3 规范

创建阶段：
1. 创建作用域链。
2. 创建变量对象VO(包括参数，函数，变量)。
3. 确定this的值。

激活/执行阶段：  
完成变量分配，执行代码。

### ES5 规范

创建阶段：
1. 确定 this 的值。
2. 创建词法环境(LexicalEnvironment)。
3. 创建变量环境(VariableEnvironment)。

激活/执行阶段：  
完成变量分配，执行代码。

我们从规范上可以知道，ES3和ES5在执行环境的创建阶段存在差异，当然他们都会在这个阶段确定this 的值(关于this 的指向问题我们以后会在专门的文章中分析各种this 的指向问题，这里便不做深究)。我们将围绕这两个规范不同点展开。尽管ES3的一些规范已经被抛弃，但是掌握ES3 创建执行环境的过程依然有助于我们理解javascript深层次的概念。