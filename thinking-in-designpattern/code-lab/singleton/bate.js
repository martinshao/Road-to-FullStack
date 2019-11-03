var Singleton = (function () {
  var instance;
  var CreateSingleton = function (name) {
    this.name = name;

    if (instance) {
      return instance;
    }
    // 打印实例名字
    this.getName();

    // instance = this;
    // return instance;
    return instance = this;
  }
  // 获取实例的名字
  CreateSingleton.prototype.getName = function () {
    console.log(this.name)
  }

  return CreateSingleton;
})();
// 创建实例对象1
var a = new Singleton('a');
// 创建实例对象2
var b = new Singleton('b');

console.log(a === b);
