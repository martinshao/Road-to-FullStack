/**
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!
 
LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~
 
LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~
 
LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
 */

class LazyMan {
  constructor(name) {

    this.name = name;
    this.presetTime = 0;

    this.sayName = this.sayName.bind(this);

    this.p = Promise.resolve().then(() => {
      if(this.presetTime > 0) {
        return this.holdon(this.presetTime); 
      }
    }).then(this.sayName)
  }
  sayName() {
    console.log(`Hi! This is ${this.name}`);
    return this;
  }
  sleep(time) {
    this.p = this.p.then(() => {
      this.holdon(time);
    })
    return this;
  }
  eat(food) {
    this.p = this.p.then(() => {
      console.log(`Eat, ${food}`);
    });
    return this;
  }
  holdon(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        resolve();
      }, time * 1000);
    })
  }
  sleepFirst(time) {
    this.presetTime = time;
    return this;
  }
}

// new LazyMan("Hank").sleepFirst(5).eat("supper")

// const hank = new LazyMan('Hank')

new LazyMan("Hank").sleep(10).eat("dinner")


(function (window, undefined) {
  var taskList = [];

  // 类
  function LazyMan() {};

  LazyMan.prototype.eat = function (str) {
    subscribe("eat", str);
    return this;
  };

  LazyMan.prototype.sleep = function (num) {
    subscribe("sleep", num);
    return this;
  };

  LazyMan.prototype.sleepFirst = function (num) {
    subscribe("sleepFirst", num);
    return this;
  };

  // 订阅
  function subscribe() {
    var param = {},
      args = Array.prototype.slice.call(arguments);

    if (args.length < 1) {
      throw new Error("subscribe 参数不能为空!");
    }

    param.msg = args[0];
    param.args = args.slice(1); // 函数的参数列表

    if (param.msg == "sleepFirst") {
      taskList.unshift(param);
    } else {
      taskList.push(param);
    }
  }

  // 发布
  function publish() {
    if (taskList.length > 0) {
      run(taskList.shift());
    }
  }

  // 鸭子叫
  function run(option) {
    var msg = option.msg,
      args = option.args;

    switch (msg) {
      case "lazyMan":
        lazyMan.apply(null, args);
        break;
      case "eat":
        eat.apply(null, args);
        break;
      case "sleep":
        sleep.apply(null, args);
        break;
      case "sleepFirst":
        sleepFirst.apply(null, args);
        break;
      default:
        ;
    }
  }

  // 具体方法
  function lazyMan(str) {
    lazyManLog("Hi!This is " + str + "!");

    publish();
  }

  function eat(str) {
    lazyManLog("Eat " + str + "~");
    publish();
  }

  function sleep(num) {
    setTimeout(function () {
      lazyManLog("Wake up after " + num);

      publish();
    }, num * 1000);

  }

  function sleepFirst(num) {
    setTimeout(function () {
      lazyManLog("Wake up after " + num);

      publish();
    }, num * 1000);
  }

  // 输出文字
  function lazyManLog(str) {
    console.log(str);
  }

  // 暴露接口
  window.LazyMan = function (str) {
    subscribe("lazyMan", str);

    setTimeout(function () {
      publish();
    }, 0);

    return new LazyMan();
  };

})(window);
// LazyMan("Hank")
// LazyMan("Hank").sleep(2).eat("dinner")
// LazyMan("Hank").eat("dinner").eat("supper")
LazyMan("Hank").sleepFirst(5).eat("supper")