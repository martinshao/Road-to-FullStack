# React 可维护项目结构设计

## React 项目代码优化小技巧

### 1. 解构 props

``` js
<ContactInfo name={name} email={email} phone={phone} />

const ContactInfo = ({ name, email, phone }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p> E-mail: {email}</p>
      <p> Phone: {phone}</p>
    </div>
  );
};
```

### 2. 保持导入模块的顺序

1. 标准模块
2. 第三方模块
3. 自己代码导入（组件）
4. 特定于模块的导入（例如CSS，PNG等）
5. 仅用于测试的代码

``` js
import React from 'react';

import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { EuiPage, EuiPageBody } from '@elastic/eui';
import { keyCodes } from '@elastic/eui/lib/services';

import HeaderNavigation from './components/HeaderNavigation';
import SidebarNavigation from './components/SidebarNavigation';
import { isEmpty } from '../utils';
import Routes from './Routes';

import './index.less'
```

### 3. 使用 Fragments

``` js
const Columns = () => {
  return (
    <Fragment>
      <td>Hello</td>
      <td>World</td>
    </Fragment>
  );
};
// or
const Columns = () => {
  return (
    <>
      <td>Hello</td>
      <td>World</td>
    </>
  );
};
```

### 4. 使用展示组件和容器组件

#### 容器组件

它们不关注样式，通常不包含任何样式
它们用于处理数据，可以请求数据，捕获更改和传递应用程序数据
负责管理状态，重新渲染组件等等
可能依赖于应用程序，调用 Redux，生命周期方法，API和库等等。

#### 展示组件

主要关注UI，它们负责组件的外观。
数据由 props 提供，木偶组件中不应该调用API，这是智能组件的工作
除了UI的依赖包，它们不需要依赖应用程序
它们可能包括状态，但仅用于操纵UI本身-它们不应存储应用程序数据。

更好的可读性
更好的可重用性
更容易测试