# React+Ts打造Modal模态对话框

## 问题总结

在实现 [TypeScript 中文手册][2] 中的代码的时候，会发现在 `createStore` 的时候产生一个错误，如下：

``` tsx
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

const store = createStore<StoreState>(enthusiasm);

// Expected 4 type arguments, but got 1.ts(2558)
```

首先上述写法在 redux@3.7.2 版本是没有问题的，但是在 redux 版本升级到 4.X 之后，就会提示上述错误，归根结底是 Redux 在大版本升级的时候，将接口 StoreCreator 就行了修改：

``` ts
// on 3.7.2 the createStore signature is this:
export interface StoreCreator {
  <S>(reducer: Reducer<S>, enhancer?: StoreEnhancer<S>): Store<S>;
  <S>(reducer: Reducer<S>, preloadedState: S, enhancer?: StoreEnhancer<S>): Store<S>;
}

// whereas on 4.0.0 it now is
export interface StoreCreator {
  <S, A extends Action, Ext, StateExt>(reducer: Reducer<S, A>, enhancer?: StoreEnhancer<Ext, StateExt>): Store<S & StateExt, A> & Ext;
  <S, A extends Action, Ext, StateExt>(reducer: Reducer<S, A>, preloadedState: DeepPartial<S>, enhancer?: StoreEnhancer<Ext>): Store<S & StateExt> & Ext;
}
```

所以最简单粗暴的fix上面报错的方法就是（不得不说any在ts中真是万能药，但是滥用就失去了使用ts的意义）：
``` ts
import { EnthusiasmAction } from './actions/index';
const store = createStore<StoreState, EnthusiasmAction, any, any>(enthusiasm);

// 或者就干脆不要在createStore上加泛型约束，不会报错，也不会对运行时产生影响
const store = createStore(enthusiasm);
```

另一种解决方案就是将 `redux` 版本回滚到 3.7.2 版本，但这样可能又会带来一个新的问题：
``` tsx
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index';

const store = createStore<StoreState>(enthusiasm);

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Hello />
      </Provider>
    </div>
  );
}

// No overload matches this call.
//   Overload 1 of 2, '(props: Readonly<ProviderProps<AnyAction>>): Provider<AnyAction>', gave the following error.
//     Property '[Symbol.observable]' is missing in type 'Store<StoreState>' but required in type 'Store<any, AnyAction>'.
//   Overload 2 of 2, '(props: ProviderProps<AnyAction>, context?: any): Provider<AnyAction>', gave the following error.
//     Type 'Store<StoreState>' is not assignable to type 'Store<any, AnyAction>'.ts(2769)
// index.d.ts(247, 3): '[Symbol.observable]' is declared here.
// index.d.ts(445, 5): The expected type comes from property 'store' which is declared here on type 'IntrinsicAttributes & IntrinsicClassAttributes<Provider<AnyAction>> & Readonly<ProviderProps<AnyAction>> & Readonly<{ children?: ReactNode; }>'
// index.d.ts(445, 5): The expected type comes from property 'store' which is declared here on type 'IntrinsicAttributes & IntrinsicClassAttributes<Provider<AnyAction>> & Readonly<ProviderProps<AnyAction>> & Readonly<{ children?: ReactNode; }>'
```

解决上面这个问题其实很简单：
``` tsx
// 使用断言，强制将store的类型断定为any
const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store as any}>
        <Hello />
      </Provider>
    </div>
  );
}
```

问题解决了，但是这个问题的出现的原因是什么呢？其实还是版本的问题， `react-redux` 的版本和 `redux` 的版本兼容问题。报错版本的 `react-redux` 版本已经是 **7.1.1** 而我们使用的是 `redux` 版本是 **3.7.2**。那么具体带来的问题是什么？让我们从源码了解详情。打开 [react-redux 的 DefinitelyTyped-types-react-redux源码][51] 看看:

``` ts
// V7版本
export interface ProviderProps<A extends Action = AnyAction> {
  store: Store<any, A>;
  context?: Context<ReactReduxContextValue>;
}
export class Provider<A extends Action = AnyAction> extends Component<ProviderProps<A>> { }

// V6版本
export interface ProviderProps<A extends Action = AnyAction> {
  store: Store<any, A>;
}
export class Provider<A extends Action = AnyAction> extends Component<ProviderProps<A>> { }

// V5版本
export interface ProviderProps {
  store?: Store<any>;
  children?: ReactNode;
}
export class Provider extends React.Component<ProviderProps, {}> { }
```

这样就很明了了，这下就明白了为什么在 `store={store}` 上会有这样的提示：`(JSX attribute) store: Store<any, AnyAction>`。

经过上面两个错误，管中窥豹可见一斑，使用 `React` 全家桶的项目在和 `typescript` 结合过程中，各种坑是避免不了的，而且这里还没有提及 `Dva` `ant-design` 等周边。



## 参考资料

* [深入理解 TypeScript][1]
* [TypeScript 中文手册][2]
* [react-modal][3]
* [手把手带你实现React的Modal组件][4]
* [React 模态框秘密和“轮子”渐进设计][5]

[1]: https://jkchao.github.io/typescript-book-chinese/jsx/reactJSX.html
[2]: https://typescript.bootcss.com/tutorials/react.html
[3]: http://reactcommunity.org/react-modal/
[4]: https://juejin.im/post/5c668b22f265da2ddc3c6532
[5]: https://juejin.im/post/59edcd166fb9a045030f4089

[51]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-redux