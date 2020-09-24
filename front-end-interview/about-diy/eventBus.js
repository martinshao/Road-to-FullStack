// method 1
class EventBus {

  constructor() {
    this.subscription = {}
  }

  subscribe(eventType, callback) {
    const id = Symbol('id')
    if (!this.subscription[eventType]) this.subscription[eventType] = {}
    this.subscription[eventType][id] = callback;
    return {
      unsubscribe: (function unsubsribe() {
        console.info(this.subscription)
        delete this.subscription[eventType][id]
        if (Object.getOwnPropertySymbols(this.subscription[eventType]).length) {
          delete this.subscription[eventType];
        }
      }).bind(this)
    }
  }

  publish(eventType, arg) {
    if (!this.subscription[eventType]) return;

    Object.getOwnPropertySymbols(this.subscription[eventType])
      .forEach(key => this.subscription[eventType][key](arg))
  }
}

const eventBus = new EventBus()

const subscription = eventBus.subscribe("event", arg => console.log(arg))
eventBus.publish("event", "message")
eventBus.publish("event", "hello world")
console.info(subscription)
subscription.unsubscribe()
eventBus.publish("event", "hello world")

// method 2
class EventEmitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}


// 触发名为type的事件
EventEmitter.prototype.emit = function (type, ...args) {
  let handler;
  // 从储存事件键值对的this._events中获取对应事件回调函数
  handler = this._events.get(type);
  if (args.length > 0) {
    handler.apply(this, args);
  } else {
    handler.call(this);
  }
  return true;
};

// 监听名为type的事件
EventEmitter.prototype.addListener = function (type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

const eventEmitter = new EventEmitter()
eventEmitter.addListener('event', (args) => console.info(args))
eventEmitter.emit('event', 'Hello')

// method 3
class EventEmitter {
  constructor() {
    this._events = this._events || new Map()
    this._maxListeners = this._maxListeners || 10
  }

  emit(type, ...args) {
    let handler;
    handler = this._events.get(type)
    if (args.length > 0) {
      handler.apply(this, args)
    } else {
      handler.call(this)
    }
    return true
  }

  addListener(type, fn) {
    if (!this._events.get(type)) {
      this._events.set(type, fn)
    }
  }

  emit(type, ...args) {
    let handler;
    handler = this._events.get(type)
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        if (args.length > 0) {
          handler[i].apply(this, args)
        } else {
          handler[i].call(this)
        }
      }
    } else {
      if (args.length > 0) {
        handler[i].apply(this, args)
      } else {
        handler[i].call(this)
      }
    }
  }

  addListener(type, fn) {
    const hander = this._events.get(type)
    if (!handler) {
      this._events.set(type, fn)
    } else if (handler && typeof handler === 'function') {
      this._events.set(type, [handler, fn])
    } else {
      handler.push(fn)
    }
  }

  removeListener(type, fn) {
    const handler = this._events.get(type)
    if (handler && typeof handler === 'function') {
      this._events.delete(type, fn)
    } else {
      let position
      for (let i = 0; i < handler.length; i++) {
        if (handler[i] === fn) {
          position = i
        } else {
          position = -1
        }
      }
      if (position !== -1) {
        handler.splice(position, 1)
        if (handler.length === 1) {
          this._events.set(type, handler[0]);
        }
      } else {
        return this
      }
    }
  }
}

class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  emit(eventName) {
    this.events[eventName] && this.events[eventName].forEach(cb => cb())
  }
}

const eventEmitter = new EventEmitter()

function workDay() {
  console.log("每天工作");
}

function makeMoney() {
  console.log("赚100万");
}

function sayLove() {
  console.log("向喜欢的人示爱");
}

em.on("money", makeMoney);
em.on("love", sayLove);
em.on("work", workDay);

em.emit("money");
em.emit("love");
em.emit("work");

class Subject { // 被观察者 学生
  constructor(name) {
    this.state = 'happy'
    this.observers = [] // 存储所有观察者
  }

  attach(o) {
    this.observers.push(o)
  }

  notify(newState) {
    this.state = newState;
    this.observers.forEach(o => o.update(this))
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  update(student) {
    console.info(`当前${this.name}被通知了，当前学生的状态是${student.state}`)
  }
}

const student = new Subject('学生')

const parent = new Observer('父母')
const teacher = new Observer('老师')

student.notify(parent)
student.notify(teacher)
student.setState('被欺负了')

class Hunter {
  constructor(name, level) {
    this.name = name
    this.level = level
    this.list = []
  }

  notify(money) {
    console.info(`${this.level}猎人${this.name}寻求帮助`)
    this.list.forEach(function (item, index) {
      item(money)
    })
  }

  attach(target, fn) {
    console.info(`${this.level}猎人${this.name}订阅了${target.name}`)
    target.list.push(fn)
  }
}

let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')

//Peter等级较低，可能需要帮助，所以小明，小金，小张都订阅了Peter
hunterMing.attach(hunterPeter, function (money) {
  console.log('小明表示：' + (money > 200 ? '' : '暂时很忙，不能') + '给予帮助')
})
hunterJin.attach(hunterPeter, function () {
  console.log('小金表示：给予帮助')
})
hunterZhang.attach(hunterPeter, function () {
  console.log('小张表示：给予帮助')
})

//Peter遇到困难，赏金198寻求帮助
hunterPeter.notify(198)

const HunterUnion = {
  type: 'hunt',
  topics: Object.create(null),
  subscribe: function (topic, fn) {
    if (!this.topics[topic]) {
      this.topics[topic] = []
    }
    this.topics[topic].push(fn)
  },

  publish: function (topic, money) {
    if (!this.topics[topic]) {
      return;
    }
    for (let fn of this.topics[topic]) {
      fn(money)
    }
  }
}

class Hunter {
  constructor(name, level) {
    this.name = name
    this.level = level
  }

  subscribe(topic, fn) {
    console.info(`${this.level}猎人${this.name}订阅了${topic}狩猎的任务`)
    HunterUnion.subscribe(topic, fn)
  }

  publish(topic, money) {
    console.info(`${this.level}猎人${this.name}发布了${topic}狩猎的任务`)
    HunterUnion.publish(topic, money)
  }
}

//猎人工会走来了几个猎人
let hunterMing = new Hunter('小明', '黄金')
let hunterJin = new Hunter('小金', '白银')
let hunterZhang = new Hunter('小张', '黄金')
let hunterPeter = new Hunter('Peter', '青铜')

//小明，小金，小张分别订阅了狩猎tiger的任务
hunterMing.subscribe('tiger', function (money) {
  console.log('小明表示：' + (money > 200 ? '' : '不') + '接取任务')
})
hunterJin.subscribe('tiger', function (money) {
  console.log('小金表示：接取任务')
})
hunterZhang.subscribe('tiger', function (money) {
  console.log('小张表示：接取任务')
})
//Peter订阅了狩猎sheep的任务
hunterPeter.subscribe('sheep', function (money) {
  console.log('Peter表示：接取任务')
})

//Peter发布了狩猎tiger的任务
hunterPeter.publish('tiger', 198)