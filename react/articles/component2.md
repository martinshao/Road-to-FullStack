# 认识React组件基础篇——受控组件 & 非受控组件

## 认识表单

在介绍受控组件和非受控组件之前，先简单介绍一下HTML中的表单。表单是一类特殊的HTML标签，用于搜集不同类型的用户输入。

首先，`<form>` 元素定义 HTML 表单，表单元素指的是不同类型的 `input` 元素、复选框、单选按钮、提交按钮等等。

![form_sample_form](../assets/form_sample_form.png "form_sample_form")

``` js
<form>
  <p><label>姓名：<input></label></p>
  <p><label>电话：<input type="tel"></label></p>
  <p><label>邮箱：<input type="email"></label></p>
  <fieldset>
    <legend> 披萨大小 </legend>
    <label><input type="radio" name="size"> 小 </label>
    <label><input type="radio" name="size"> 中 </label>
    <label><input type="radio" name="size"> 大 </label>
  </fieldset>
  <fieldset>
    <legend> 披萨配料 </legend>
    <label><input type="checkbox"> 熏肉 </input></label>
    <label><input type="checkbox"> 奶酪 </input></label>
    <label><input type="checkbox"> 洋葱 </input></label>
    <label><input type="checkbox"> 蘑菇 </input></label>
  </fieldset>
  <p><label>配送时间：<input type="time" min="11:00" max="2100" step="900"></label></p>
  <p><button>提交订单</button></p>
</form>
```

表单为页面的主要组成部分，其中包含许多的表单控件。用户通过控件提供数据并提交给服务器，服务器则做出相应的处理。而编写一个正常工作的表单需要三个部分：

构建表单
服务器处理（提供接受数据接口）
配置表单

以往我们利用表单的时候，构建表单，配置表单之后，然后将表单的数据的提交给服务器处理。如果在对表单