1. hooks手写 原理
2. 生命周期的细节
3. react原理 fiber lanes 18特性
4. 解决过实际的问题么， 收益是啥呢
5. react同构问题 BFF SFF架构

实际问题、细节深入

1. createElement(虚拟dom)
2. reader
3. Concurrent Mode
   1. 允许中断渲染，优先级更高优先执行
   2. 将渲染工作进行分解，分解成一个个的小fiber task
   3. requestIdleCallback(mock模拟)
      messageChannel (macrotask) + requestAnimationFrame(计算超时时间)
4. Fiber
   1. 小块 fibertask (虚拟dom + 状态) -> fiber tree -> 将要被渲染的 tree 双缓存
   2. fiber 是一种数据结构 也是一个工作单元


1. 深入了解Atomic state、推动Jotai落地，实现跨私仓状态机
2. 配合Atomic State落地ACSS，实现版本迭代CSS体积减少60%
3. 基于Taiwind CSS插件 xxxStart xxxFork
4. 基于业务拆分，推动团队落地私有mirror，并完善了monorepo（lerna+pnpm workspace）
5. 熟悉React、Webpack、Jotai、CRA等原理
6. 基于高T技术架构实现了组内E2E/Unit测试全流程（含自动生成测试code）
7. 熟悉前端工程化、掌握前端工程化架构的基本原理，了解http，了解计算机原理，了解V8