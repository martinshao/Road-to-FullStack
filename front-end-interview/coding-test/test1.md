小测试：

1. 解析链接参数
2. 高阶函数实现AOP
3. 阶乘
4. 二分查找
5. 斐波那契数列
6. 实现栈结构
7. 十进制转化为其他进制 (利用栈)
8. 一道关于Array push的JS题
9. 

#### 1、 解析链接参数

Node.js 中有一个queryString模块，可以实现将 urlStr 主机地址后面的参数转化为对象。

let urlStr = 'http://www.inode.club?name=koala&study=js&study=node';
转换结果如下:

{ name: 'koala', study: [ 'js', 'node' ] }

``` js
let urlStr = 'http://www.inode.club?name=koala&study=js&study=node'
// 参数转成对象
function queryString(request){
    let params = request.split('?')[1];
    let param = params.split('&');
    let obj = {};
    for (let i = 0;i<param.length;i++){
        let paramsA = param[i].split('=');
        let key = paramsA[0];
        let value = paramsA[1];
        if(obj[key]){
            obj[key] = Array.isArray(obj[key])?obj[key]:[obj[key]];
            obj[key].push(value);
        }else{
            obj[key] = value;
        }
    }
    return obj;
}
console.log(queryString(urlStr));
```

