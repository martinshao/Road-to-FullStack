# 通往全栈之路

整理分享一些我在全栈之路上前进的一些知识和心得体会。
首先，这条道路是异常艰辛，抛开前端现在发展火热的趋势，依旧有部分公司对于前端的认知不够。

## 前端体系

| Ⅰ | Ⅱ | Ⅲ | Ⅳ | Ⅴ | Ⅵ | Ⅶ | Ⅷ | Ⅸ | Ⅹ |
| :-:| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| JavaScript<br>![js][1] | CSS<br>![js][2] | HTML<br>![js][3] | Webpack<br>![js][4] | NodeJs<br>![js][5] | Typescript<br>![js][6] | Vue<br>![js][7] | React<br>![js][8] | Angular<br>![js][base64str] | Tools<br>![js][10] |

## 后端体系

| Ⅰ | Ⅱ | Ⅲ | Ⅳ | Ⅴ | Ⅵ | Ⅶ | Ⅷ | Ⅸ | Ⅹ |
| :--------: | :---------: | :---------: | :---------: | :---------: | :---------:| :---------: | :-------: | :-------:| :------:|
| 算法[:pencil2:](#pencil2-算法) | 操作系统[:computer:](#computer-操作系统)|网络[:cloud:](#cloud-网络) | 面向对象[:couple:](#couple-面向对象) |数据库[:floppy_disk:](#floppy_disk-数据库)| Java [:coffee:](#coffee-java)| 系统设计[:bulb:](#bulb-系统设计)| 工具[:hammer:](#hammer-工具)| 编码实践[:speak_no_evil:](#speak_no_evil-编码实践)| 后记[:memo:](#memo-后记) |

[1]: ./css/_assets/js.svg
[2]: ./css/_assets/css.svg
[3]: ./css/_assets/html5.svg
[4]: ./css/_assets/webpack.svg
[5]: ./css/_assets/nodejs.svg
[6]: ./css/_assets/typescript.svg
[7]: ./css/_assets/vue.svg
[8]: ./css/_assets/react.svg
[base64str]: data:image/png;base64,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
[10]: ./css/_assets/tools.svg

## 前端知识体系详细梳理

** 各部分课程详细笔记
* [你不知道的html][1]
* [CSS基础与高级][2]
* [JavaScript基础与精粹][3]
* [JavaScript与QA测试工程师][6]
* [PHP与MySQL入门到实践][5] *未完成*
* [JavaScript函数式编程超指南][7]
* [NodeJs开发实践与Web框架][8]
* [前端工程化与构建工具选型][9]
* [前端性能优化全面解析与实践][10]

[1]: https://github.com/Martin-Shao/yideng-note/blob/master/html-senior/exercises.md
[2]: https://github.com/Martin-Shao/yideng-note/blob/master/css-senior/overview.md
[3]: https://github.com/Martin-Shao/yideng-note/blob/master/es5-senior/exercises.md
[4]: https://github.com/Martin-Shao/yideng-note/blob/master/es6-senior/exercises.md
[5]: https://github.com/Martin-Shao/yideng-note
[6]: https://github.com/Martin-Shao/yideng-note/blob/master/fe-qa/FrontEnd-QA.md
[7]: https://github.com/Martin-Shao/yideng-note/tree/master/functional-programming