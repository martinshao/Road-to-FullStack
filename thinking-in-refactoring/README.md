# 重构 改善既有代码的设计

@version 第二版

***

## 为何重构

1. 重构改进软件的设计
2. 重构使软件更容易理解
3. 重构帮助找到BUG
4. 重构提高编程速度

### 重构改进软件的设计

如果没有重构，程序的内部设计（或者叫架构）会逐渐腐败变质。当人们只为短期目的而修改代码时，他们经常没有完全理解架构的整体设计，于是代码逐渐失去了自己的结构。程序员越来越难通过阅读源码来理解原来的设计。代码结构的流失有累积效应。越难看出代码所代表的设计意图，就越难保护其设计，于是设计就腐败得越快。经常性的重构有助于代码维持自己该有的形态。