# ant design pro开发过程总结

如何结合将react和ts结合在一起的最好方式是在实际开发中探索，下面总计在ant design pro 中的开发总结。

在 `pages` 中创建一个目录，起一个好的名字，然后新建文件 `index.tsx` ，下面重点关注一下如何创建组件的形式：

1. 组件创建，类组件，FC组件或者SFC组件，基本框架写好
2. 数据类型接口定义好
3. IProps 和 IState 接口定义好， 注意组件的类型和属性，需要继承那些外部组件的接口，例如antD 中的Form需要继承FormComponentProps
4. service 请求文件，按照mvc思想去编码，model层主要作请求和数据处理
   1. 这一步要提前想好你的页面大概需要多少接口处理数据，接口如何命名。比如说一般的请求都是增删查改：query、remove、add、update，后面可以相应的加上model名字
5. _mock.ts 模拟数据，`ant design pro` 集成了mock功能，因为在service层代码准备好之后可以开始着手准备模拟数据。
6. 这个时候先不要急着创建model文件，可以在view层试着放松请求，看一下请求接口和模拟响应接口是否正常，顺便检查一下模拟数据是否正常。
7. 在数据和请求接口准备完备后，就可以着手开发 model层代码，由于状态管理工具用的是 `dva` ，可以先参考官网把代码的架构先写出来。

#### 1. 类组件

``` tsx
interface FormProps {
  first_name: string;
  last_name: string;
  age: number;
  agreetoterms?: boolean;
}

interface FormState {
  count: number;
}

class MyForm extends React.Component<FormProps, FormState> {

  static defaultProps = {
    first_name: '邵',
    last_name: '伟',
    age: 12
  }

  constructor(props: FormProps) {
    super(props)
  }

  state = {
    count: 1
  }

  render() {
    const { first_name, last_name, age } = this.props
    return (
      <div>
        <ul>
          <li>{first_name}</li>
          <li>{last_name}</li>
          <li>{age}</li>
        </ul>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>增加</button>
      </div>
    )
  }

  private handleClick = () => this.setState({count: this.state.count+1});
}


interface AppProps {
  title?: React.ReactNode;
}

const MyProd: React.SFC<AppProps> = props => {
  const {title} = props;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">{title}</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  )
}

MyProd.defaultProps = {
  title: '我的产品'
}
```

#### 2. 数据类型声明文件

``` ts
import { EffectsCommandMap } from "dva";
import { AnyAction, Reducer } from "redux";
import { ProdLiistData } from './data'

export interface StateType {
  data: ProdLiistData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    add: Effect;
    remove: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>
  }
}

const Model: ModelType = {
  namespace: 'myProdList',

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  effects: {
    *fetch(){},
    *add() {},
    *remove() {},
    *update() {},
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      }
    }
  }
}

export default Model;
```