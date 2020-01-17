//举例一：异常逻辑处理例子
const obj = getObj();
if (obj != null) {
  //do something
} else {
  //do something
}

//举例二：状态处理例子
const obj = getObj();
if (obj.getType == 1) {
  //do something
} else if (obj.getType == 2) {
  //do something
} else {
  //do something
}

function disablityAmount() {
  if (_seniority < 2)
    return 0;

  if (_monthsDisabled > 12)
    return 0;

  if (_isPartTime)
    return 0;

  //do somethig

}

// Much better, Yep
const aCase = 'case1'

// 基本类型作为key
new Map([
  ['case1',()=>{/*do sth*/}],
  ['case2',()=>{/*do sth*/}],
  //...
]).get(aCase)()


// object作为key
const actions = new Map([
  [{identity:'guest',status:1},()=>{/* functionA */}],
  [{identity:'guest',status:2},()=>{/* functionA */}],
  [{identity:'guest',status:3},()=>{/* functionA */}],
  [{identity:'guest',status:4},()=>{/* functionA */}],
  [{identity:'guest',status:5},()=>{/* functionB */}],
  //...
])

// 正则用法
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}
  return new Map([
    [/^guest_[1-4]$/,functionA],
    [/^guest_5$/,functionB],
    [/^guest_.*$/,functionC],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  // 过滤某些策略
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}

