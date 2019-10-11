# React生命周期大总结(含新旧版本对比)

React 2013年推出至今（2019年）已经有6年时间，这期间 React 的生命周期发生了巨大的变化。一方面研究生命周期产生了那些变化，原因是什么？解决了什么问题？另外一方面也是对React生命周期更深入的理解，以及如何更好的使用。

首先，React推出至今在我的认知里发生过一次大改动和一次小改动。React 16 版本由于使用了全新的核心算法架构Fiber，由此对于新老生命周期做了一些改动。React 16 版本之前的生命周期如下：

![react lifecycle](../assets/9724718-c473742207bd71ea.png "react lifecycle")

另外还有一个有意思的图放在这里做一个比较。

![class createClass](../assets/20191007165935.png "class createClass")

下面是生命周期对应的钩子函数：

* constructor
* componentWillMount
* componentDidMount
* componentWillUnmount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* componentDidUpdate
* render

首先我们研究一下钩子函数具体执行顺序：

![hooks function sort](../assets/3703585223-5a90fadf9d735.png "hooks sort")

这张图详细的给出了钩子函数的执行顺序，另外一个细节就是 setState 方法能够执行的钩子函数也给明确的指出来了。

为了更加生动的显示的钩子函数的执行顺序，给出了这样一个示例代码：

``` jsx

```