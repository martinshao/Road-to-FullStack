export function codes(param) {
  const InfoCode = [
    { NumberCode: 10070107, TextCode: "AB面宽高尺寸不一致" },
    { NumberCode: 10070110, TextCode: "AB面和C面宽不一致" },
    { NumberCode: 10080101, TextCode: "旋转A面" },
    { NumberCode: 10080102, TextCode: "旋转B面" },
    { NumberCode: 10080106, TextCode: "旋转C面" },
    { NumberCode: 20070107, TextCode: "AB面宽高尺寸不一致" },
  ]

  const TextError = []

  for (let j = 0; j < InfoCode.length; j++) {
    for (let l = 0; l < param.Info.length; l++) {
      if (InfoCode[j].NumberCode === param.Info[l]) {
        TextError.push(InfoCode[j].TextCode)
      }
    }
  }

  return TextError.toString()
}

const errcode2str = (codeArr) => {
  const ERRCODE_ENUM = {
    10070107: 'AB面宽高尺寸不一致',
    10070110: 'AB面和C面宽不一致',
    10080101: '旋转A面',
    10080102: '旋转B面',
    10080106: '旋转C面',
    20070107: 'AB面宽高尺寸不一致',
  }
  if (!Array.isArray(codeArr)) return ''
  return codeArr.map(code => ERRCODE_ENUM[code]).toString()
}

const errcode2str = (codeArr) => {

  const ERRCODE_ENUM = {
    10070107: 'AB面宽高尺寸不一致',
    10070110: 'AB面和C面宽不一致',
    10080101: '旋转A面',
    10080102: '旋转B面',
    10080106: '旋转C面',
    20070107: 'AB面宽高尺寸不一致',
  }

  if (!Array.isArray(codeArr)) return ''

  const strArr = []
  const toStr = (key) => ERRCODE_ENUM[key]
  codeArr.forEach(code => {
    toStr(code) && strArr.push(toStr(code))
  })

  return strArr.toString()
}

const codeArr = ['10070107', '10070110', '10080101', '20070107', '20200512']
const errStr = errcode2str(codeArr)
