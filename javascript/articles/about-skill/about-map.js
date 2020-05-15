const info = {
  name: 'wangly',
  sex: '男',
  age: '18',
  phone: '13000000000',
  address: '中国......',
  duty: '总经理'
}

const arrInfo = [
  {
    '姓名': 'wangly'
  }
]

infoMap.map(([label, value]) => (
  <div className="info-item">
    <span>{label}</span>
    <span>{value}</span>
  </div>
))

infoMap.forEach(([label, value]) => (
  <div className="info-item">
    <span>{label}</span>
    <span>{value}</span>
  </div>
))

const mapKeys = ['姓名', '性别', '年龄', '电话', '家庭地址', '身份']

const USER_ENUM = {
  name: '姓名',
  sex: '性别',
  age: '年龄',
  phone: '电话',
  address: '家庭地址',
  duty: '身份',
}

const boy = { [USER_ENUM['name']]: '邵孤城' }

// 动态对象键
const chosenAnimal = 'cat'
const animals = {
  [`animal${chosenAnimal}`]: true,
}
console.log(animals.animalcat) // true

const info = {
  name: 'wangly',
  sex: '男',
  age: '18',
  phone: '13000000000',
  address: '中国......',
  duty: '总经理'
}
const USER_ENUM = {
  name: '姓名',
  sex: '性别',
  age: '年龄',
  phone: '电话',
  address: '家庭地址',
  duty: '身份',
}
const infoShow = Object.entries(info).map(([key, value]) => ({ label: USER_ENUM[key], value }))


const info = {
  name: 'wangly',
  sex: '男',
  age: '18',
  phone: '13000000000',
  address: '中国......',
  duty: '总经理'
}
const USER_ENUM = {
  name: '姓名',
  sex: '性别',
  age: '年龄',
  phone: '电话',
  address: '家庭地址',
  duty: '身份',
}
const result = new Map()
for (const key in info) {
  result.set(USER_ENUM[key], info[key])
}

for (const [key, value] of result) {
  console.info(key, value)
}