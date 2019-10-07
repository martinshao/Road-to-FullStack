
## animation

| 值 | 描述 |
| - | :- |
| animation-name | 规定需要绑定到选择器的 keyframe 名称。|
| animation-duration | 规定完成动画所花费的时间，以秒或毫秒计。 |
| animation-timing-function | 规定动画的速度曲线。 |
| animation-delay | 规定在动画开始之前的延迟。 |
| animation-iteration-count | 规定动画应该播放的次数。 |
| animation-direction | 规定是否应该轮流反向播放动画。 |

## transition

``` css
/* Apply to 1 property */
/* property name | duration */
transition: margin-right 4s;

/* property name | duration | delay */
transition: margin-right 4s 1s;

/* property name | duration | timing function */
transition: margin-right 4s ease-in-out;

/* property name | duration | timing function | delay */
transition: margin-right 4s ease-in-out 1s;

/* Apply to 2 properties */
transition: margin-right 4s, color 1s;

/* Apply to all changed properties */
transition: all 0.5s ease-out;

/* Global values */
transition: inherit;
transition: initial;
transition: unset;
```

## 参考资料

* [transition [MDN]][1]
* [Using CSS transitions [MDN]][2]

[1]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition
[2]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions