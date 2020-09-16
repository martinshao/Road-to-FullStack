class EventEmeitter {
  constructor() {
    this._events = this._events || new Map()
    this._maxListeners = this._maxListeners || 10;
  }

  emit(type, ...args) {
    let handler = null;
    handler = this._events(type)
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
}