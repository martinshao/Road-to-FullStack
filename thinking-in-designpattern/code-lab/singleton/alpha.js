// 定义一个类
function Singleton(name) {
  this.name = name;
  this.instance = null;
}
// 原型扩展类的一个方法getName()
Singleton.prototype.getName = function () {
  console.log(this.name)
};
// 获取类的实例
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance
};

// 获取对象1
var a = Singleton.getInstance('a');
// 获取对象2
var b = Singleton.getInstance('b');
// 进行比较
console.log(a === b);