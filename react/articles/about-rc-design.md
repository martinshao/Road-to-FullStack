# React 组件设计原则与开发实践

**Table of Contents**
1. “Single responsibility”
   1. The pitfall of multiple responsibilities
   2. Case study: make component have one responsibility
   3. Case study: HOC favors single responsibility principle
2. “Encapsulated”
   1. Information hiding
   2. Communication
   3. Case study: encapsulation restoration
3. “Composable”
   1. Composition benefits
      1. Single responsibility
      2. Reusability
      3. Flexibility
      4. Efficiency
4. “Reusable”
   1. Reuse across application
   2. Reuse of 3rd party libraries
5. “Pure” or “Almost-pure”
   1. Case study: purification from global variables
   2. Case study: purification from network requests
   3. Transform almost-pure into pure
6. “Testable” and “Tested”
   1. Case study: testable means well designed
7. “Meaningful”
   1. Component naming
      1. Pascal case
      2. Specialization
      3. One word - one concept
      4. Code comments
   2. Case study: write self-explanatory code
   3. Expressiveness stairs
8. Do continuous improvement
9. Reliability is important
10. Conclusion


**中文版本**
1. 单一职责原则（Single Responsibility Principle，简称 SRP）
   1. 多重职责的陷阱
   2. 案例：使组件职责单一化
   3. 案例：HOC(高阶组件)更倾向于职责单一
2. 封装
   1. 细节信息的隐藏
   2. 解决数据通信
   3. 案例：恢复封装
3. 可组合
   1. 可组合的好处
      1. 单一职责
      2. 可重用性
      3. 灵活性
      4. 效率
4. 可重用
   1. 跨应用程序重用
   2. 重用第三方库
5. 纯净的或着几乎纯净的
   1. 案例：从全局变量中提纯
   2. 案例：从网络请求中提纯
   3. 将几乎纯的转化为纯的
6. 可测试和已测试的
   1. 案例：精心设计的可测试手段
7. 有意义的
   1. 组件命名
      1. Pascal命名
      2. 专业化
      3. 一个单词一个概念
      4. 代码即注释
   2. 案例：设计自注释的代码
   3. 表达楼梯
8. 持续改进
9. 可靠性很重要