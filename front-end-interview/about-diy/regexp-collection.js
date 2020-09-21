function isCardNo(number) {
  const regx = /(^\d{15}$)|(^\d{18}$)|(^\${17}(\d|X|x)$)/
  return regx.test(number)
}

function isCardNo(number) {
  const regx = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return regx.test(number)
}

// 身份证号码的正则表达式及验证详解(JavaScript，Regex) https://juejin.im/post/6844903575877861390

/**
 * 实现千位分隔符
 */
function parseToMoney(num) {
  const regExp = /\d(?=(\d{3})+$)/g
  return num.replace(regExp, ',')
}

const number1 = '12345678'
const number2 = '123456789'

console.info(parseToMoney(number1))
console.info(parseToMoney(number2))

"12345678".replace(/(?=\d{3}$)/g, ',')
"12345678".replace(/(?=(\d{3})+$)/g, ',')
"12345678".replace(/(?!^)(?=(\d{3})+$)/g, ',')
