class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.schedulerQueue = []
    this.schedulerCount = 0;
  }

  add(promiseCreator) {
    return new Promise(resolve => {
      this.schedulerQueue.push([resolve, promiseCreator]);
      this.exec();
    })
  }

  exec() {
    if (this.schedulerCount < this.limit && this.schedulerQueue.length) {
      const [resolve, promiseCreator] = this.schedulerQueue.shift()
      this.schedulerCount++
      Promise.resolve(promiseCreator()).then(res => {
        resolve(res)
        this.schedulerCount--;
        this.exec()
      })
    }
  }
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(2)

const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.info(order))
}

addTask(4000, 4)
addTask(2000, 2)
addTask(3000, 3)
addTask(1000, 1)

let count = 1

const id = setInterval(() => {
  console.info('interval')
  count ++;
  if(count === 11) {
    clearInterval(id)
  }
}, 500);