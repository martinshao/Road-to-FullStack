# React Hooks源码解析

## 准备工作

看那一下执行hooks之前的调用栈都执行了哪些函数

update 阶段

```
resolveDispatcher
useState
UseStateDemo
renderWithHooks
updateFunctionComponent
beginWork
beginWork$1
performUnitOfWork
workLoopSync
renderRootSync
performSyncWorkOnRoot
flushSyncCallbacks
```

mount 阶段

```
renderWithHooks
mountIndeterminateComponent
beginWork
beginWork$1
performUnitOfWork
workLoopSync
renderRootSync
performConcurrentWorkOnRoot
workLoop
flushWork
performWorkUtilDeadline
-----postMessage(async)-----
schedulePerformWorkUntilDeadline
requestHostCallback
unstable_scheduleCallback
scheduleCallback$1
ensureRootIsScheduled
scheduleUpdateOnFiber
updateContainer
ReactDOMHydrationRoot.render.ReactDOMRoot.render
```