class EventBus {

  constructor() {
    this.subscription = {}
  }

  subscription (eventType, callback) {
    const id = Symbol('id')
    if(!this.subscription[eventType]) this.subscription[eventType] = {}
    this.subscription[eventType][id] = callback
    return {
      unSubscribe: (function unSubscribe() {
        delete this.subscription[eventType][id]
        if(!Object.getOwnPropertySymbols(this.subscription[eventType]).length) {
          delete this.subscription[eventType]
        }
      }).bind(this)
    }
  }

  publish(eventType, arg) {
    if(!this.subscription[eventType]) return;

    Object.getOwnPropertySymbols(this.subscription[eventType]).forEach(
      key => this.subscription[eventType][key](arg)
    )
  }
}

Function.prototype.bind

const fn = () => {}

fn.bind(this)