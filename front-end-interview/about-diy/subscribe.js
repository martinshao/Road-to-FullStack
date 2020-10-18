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