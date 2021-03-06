# Git 提交日志规范

## 前言

为什么要对 Git 提交日志（以下简称 log）的格式进行规范约束？

1. **最重要的原因** 自然是：便于人类程序员对提交历史进行追溯，了解发生了什么情况。因此像「update」甚至于「u」这样的 log，都是不合格的写法，想必诸如此类的 log 已经被大家咒骂过一遍遍。
2. 另外，一旦约束了提交日志，意味着我们将慎重地进行每一次提交，不能再一股脑儿地把各种各样的改动都放到一个提交里面，这样一来，整个代码改动的历史也将更加清晰。
3. 想得更远一点，格式化的 log 才可能用于自动化输出 changelog。

对 Git 提交日志进行格式约束是否带来较高的执行成本？

1. 所谓仓廪实而知礼节，随着大型共建项目 / 开源项目的增多，必然要用更专业化的态度去面对。规范化的 `Git log` 正是其中一环。
2. 最后，如果实在无法完美遵循日志规范，最最重要的原则是：至少要保证在整个项目中 `log` 格式的一致性！不要做一个朝秦暮楚的人。

## 基本的 `log` 格式

``` html
<type>(<scope>): <subject> <空行> <body> <空行> <footer>;
```

``` html
<type>(<scope>): <subject> // 提交消息头Message header   
<BLANK LINE> //空行
<body> // 提交具体内容
<BLANK LINE>//空行
<footer> // 额外内容

<!-- example -->
<docs>(<$compile>): <subject> 
<BLANK LINE> //空行
<body> // 提交具体内容
<BLANK LINE>//空行
<footer> // 额外内容
```

其中需要注意的是，log header 即首行部分必需，而 body 和 footer 部分可选。

`<subject>`, `<body>`, `<footer>` 内容默认使用中文。