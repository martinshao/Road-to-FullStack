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
class EventEmeitter {
  constructor() {
    this._events = this._events || new Map(); // 储存事件/回调键值对
    this._maxListeners = this._maxListeners || 10; // 设立监听上限
  }
}


// 触发名为type的事件
EventEmeitter.prototype.emit = function (type, ...args) {
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
EventEmeitter.prototype.addListener = function (type, fn) {
  // 将type事件以及对应的fn函数放入this._events中储存
  if (!this._events.get(type)) {
    this._events.set(type, fn);
  }
};

const eventEmeitter = new EventEmeitter()
eventEmeitter.addListener('event', (args) => console.info(args))
eventEmeitter.emit('event', 'Hello')