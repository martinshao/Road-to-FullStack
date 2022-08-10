## Flex 布局重点讲解

创建 flex 容器，我们把一个容器的 display 属性值改为 flex 或者 inline-flex。 完成这一步之后，容器中的直系子元素就会变为 flex 元素。所有 CSS 属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会有下列行为：

* 元素排列为一行 (flex-direction 属性的初始值是 row)。
* 元素从主轴的起始线开始。
* 元素不会在主维度方向拉伸，但是可以缩小。
* 元素被拉伸来填充交叉轴大小。
* flex-basis 属性为 auto。
* flex-wrap 属性为 nowrap。

### 重要属性

> 父元素（容器）可以设置以下六个属性：
> 
> * `flex-direction`
> * `flex-wrap`
> * `flex-flow`
> * `justify-content`
> * `align-items`
> * `align-content`

> flex-direction 更改 flex 元素的排列方向，可以改变主轴和交叉轴方向
> 
> flex-wrap 项目太大而无法全部显示在一行中，则会换行显示。
> 
> flex-flow flex-direction 和 flex-wrap 组合为简写属性 flex-flow，`flex-flow: row wrap`

flex 元素上的属性

* flex-grow    设置 flex 项 主尺寸 的 flex 增长系数。
* flex-shrink  属性指定了 flex 元素的收缩规则
* flex-basis   指定了 flex 元素在主轴方向上的初始大小

> 子元素有以下六个属性：
>
> * `order`
> * `flex-grow`
> * `flex-shrink`
> * `flex-basis`
> * `flex`
> * `align-self`