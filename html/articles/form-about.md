# H5中的表单

## 何谓表单？
    
表单是html页面中负责数据采集功能的部件，它往往由三个部分组成

* 表单标签：`<form></form>` 用于声明表单的范围，位于表单标签中的元素将被提交。属性有 `method`, `entype`, `action` 等
* 表单域：`<input...../>` 包含了 包含了文本框，密码框等多种类，属性有 `type`, `name`, `value`...
    * `type=text` 文本框
    * `type=password` 密码框
    * `type=textarea` 文本区域
    * `type=file`文件上传框
    * `type=radid` 单选框
    * `type=checkbox` 复选框
* 表单按钮
  * 提交按钮
  * 复位按钮
  * 一般按钮 
        
    我们可以通过表单，将用户输入的数据提交给服务端，并交由服务端进行处理。
    
例子：

``` html
<html>
    <head>
        <title>form表单</title>
        <meta charset="utf-8">
        <script type="text/javascript" src="getValue.js"></script>
    </head>
        <body>
            <form name="form1">
                <!--文本-->
                <input type="text" placeholder="text" name="text1" />
                <!--密码-->
                <input type="password" placeholder="password" name="password" />
                <!--多行文本域-->
                <textarea placeholder="textarea" name="textarea" style="resize:none"></textarea>
                <!--文件上传-->
                <input type="file" name="file"/>
                <!--单选框,注意name值一样-->
                <input type="radio" name="option" value="option1"/>option1
                <input type="radio" name="option" value="option1"/>option2
                <!--复选框-->
                <input type="checkbox" name="check" value="option1"/>option1
                <input type="checkbox" name="check" value="option2"/>option2
                <input type="checkbox" name="check" value="option3"/>option3
                
                <input type="submit" value="submit"/>
                <input type="reset" value="reset"/>
                <input type="button" value="button" onclick="getValue()"/>
                
            </form>
        </body>
</html>
```

javascrpt获取表单的值

``` js
function getValue(){
    var v1 = document.form1.text1.value;
    var arr = document.form1.check;
    alert(arr[0].value)
}
```

## 最基础的表单

``` html
<form method="post" action="result.html">
（表示向何处发送表单数据）
<p>名字：<input name="name" type="text" /></p>
<p>密码：<input name="pass" type="password" /></p>
<p>
    <input type="submit" name="Button" value="提交" />
    <input type="reset" name="Reset" value="重填" />
</p>
</form>
```

## 表单元素格式

``` html
<input
    type="text"（input元素类型）
    name="fname（input元素名称）
    value="text"（input元素的值）
/>
```
属性 | 说明 
:-: | :- |
type | 指定元素的类型。text、password、checkbox、radio、submit、reset、file、hidden、image 和 button，默认为 text | 
name | 指定表单元素的名称 |
value | 元素的初始值。type 为 radio时必须指定一个值 |
size | 指定表单元素的初始宽度。当 type 为 text 或 password时，表单元素的大小以字符为单位。对于其他类型，宽度以像素为单位 |
maxlength | type为text 或 password 时，输入的最大字符数 |
checked | type为radio或checkbox时，指定按钮是否是被选中 |

## 表单元素

#### 文本框-语法

