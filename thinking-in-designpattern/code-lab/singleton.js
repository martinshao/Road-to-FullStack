var mySingleton = (function () {
  var instance;
  function init() {
    function privateMethod() {
      console.log("I am private");
    }
    var privateVariable = "Im also private";
    var privateRandomNumber = Math.random();
    return {
      publicMethod: function () {
        console.log("The public can see me!");
      },
      publicProperty: "I am also public",
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };
  };
  return {
    // 如果存在获取此单例实例，如果不存在创建一个单例实例
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    }
  };
})();

var myBadSingleton = (function () {
  // 存储单例实例的引用
  var instance;
  function init() {
    // 单例
    var privateRandomNumber = Math.random();
    return {
      getRandomNumber: function () {
        return privateRandomNumber;
      }
    };
  };

  return {
    // 总是创建一个新的实例
    getInstance: function () {
      instance = init();
      return instance;
    }
  };
})();

// 使用:

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber()); // true

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber()); // true