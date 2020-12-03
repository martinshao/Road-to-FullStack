class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    const task = () => {
      console.info(`Hi! This is ${name}`);
      this.next();
    };

    this.tasks.push(task);
    console.info('constructor...')
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this;
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.info(`Wake up after ${time} second`);
        this.next();
      }, time * 1000);
    };

    if (first) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }

  eat(type) {
    const task = () => {
      console.info(`Eat ${type}~`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }
}

function HelloMan(name) {
  return new LazyMan(name);
}

HelloMan("Hank").sleepFirst(5).eat("supper")