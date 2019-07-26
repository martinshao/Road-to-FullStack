## 第一道：

``` js
var name = "caibaojian.com"; 
var person = {
    name: "kang",
    pro: {
        name: "Michael",
        getName: function() {
            return this.name;
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
console.log(pepole());
```

## 第二道：

``` js
var name = "caibaojian.com";
var person = {
    name: "kang",
    pro: {
        name: "Michael",
        getName: function() {
            console.log(this);
            return this.name;
        }
    }
};
console.log(person.pro.getName());
var pepole = person.pro.getName;
console.log(pepole());
```