# React Hooks源码解析

## 准备工作

看那一下执行hooks之前的调用栈都执行了哪些函数
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