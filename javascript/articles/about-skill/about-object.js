

const InfoCode = [
  { NumberCode: 10070107, TextCode: "AB面宽高尺寸不一致" },
  { NumberCode: 10070110, TextCode: "AB面和C面宽不一致" },
  { NumberCode: 10080101, TextCode: "旋转A面" },
  { NumberCode: 10080102, TextCode: "旋转B面" },
  { NumberCode: 10080106, TextCode: "旋转C面" },
  { NumberCode: 20070107, TextCode: "AB面宽高尺寸不一致" },
]

export function codes(param) {
  const TextError = []

  for (let j = 0; j < InfoCode.length; j++) {
    for (let l = 0; l < param.Info.length; l++) {
      if (InfoCode[j].NumberCode === param.Info[l]) {
        TextError.push(InfoCode[j].TextCode)
      }
    }
  }

  console.log(TextError.toString())
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
  const toStr = (key) => ERRCODE_ENUM[key]
  const strArr = []
  codeArr.forEach(code => {
    toStr(code) && strArr.push(toStr(code))
  })
  return strArr.toString()
}

const codeArr = ['10070107', '10070110', '10080101', '20070107', '20200512']
const errStr = errcode2str(codeArr)

// const InfoCode = [
//   { NumberCode: 10070107, TextCode: "AB面宽高尺寸不一致" },
//   { NumberCode: 10070110, TextCode: "AB面和C面宽不一致" },
//   { NumberCode: 10080101, TextCode: "旋转A面" },
//   { NumberCode: 10080102, TextCode: "旋转B面" },
//   { NumberCode: 10080106, TextCode: "旋转C面" },
//   { NumberCode: 20070107, TextCode: "AB面宽高尺寸不一致" },
//   { NumberCode: 20080101, TextCode: "旋转A面" },
//   { NumberCode: 20080102, TextCode: "旋转B面" },
//   { NumberCode: 30070107, TextCode: "BF面宽高尺寸不一致" },
//   { NumberCode: 30070108, TextCode: "DE面宽高尺寸不一致" },
//   { NumberCode: 30070109, TextCode: "AC面宽高尺寸不一致" },
//   { NumberCode: 30070110, TextCode: "BF面和AC面宽不一致" },
//   { NumberCode: 30070111, TextCode: "BF面和DE面高不一致" },
//   { NumberCode: 30070112, TextCode: "DE面宽和AC面高不一致" },
//   { NumberCode: 30080101, TextCode: "旋转B面" },
//   { NumberCode: 30080102, TextCode: "旋转F面" },
//   { NumberCode: 30080103, TextCode: "旋转D面" },
//   { NumberCode: 30080104, TextCode: "旋转E面" },
//   { NumberCode: 30080105, TextCode: "旋转A面" },
//   { NumberCode: 30080106, TextCode: "旋转C面" },
//   { NumberCode: 40070107, TextCode: "BF面宽高尺寸不一致" },
//   { NumberCode: 40070108, TextCode: "DE面宽高尺寸不一致" },
//   { NumberCode: 40070109, TextCode: "AC面宽高尺寸不一致" },
//   { NumberCode: 40070110, TextCode: "BF面和AC面宽不一致" },
//   { NumberCode: 40070111, TextCode: "BF面和DE面高不一致" },
//   { NumberCode: 40070112, TextCode: "DE面宽和AC面高不一致" },
//   { NumberCode: 40080101, TextCode: "旋转B面" },
//   { NumberCode: 40080102, TextCode: "旋转F面" },
//   { NumberCode: 40080103, TextCode: "旋转D面" },
//   { NumberCode: 40080104, TextCode: "旋转E面" },
//   { NumberCode: 40080105, TextCode: "旋转A面" },
//   { NumberCode: 40080106, TextCode: "旋转C面" },
//   { NumberCode: 50070108, TextCode: "BD面宽高尺寸不一致" },
//   { NumberCode: 50070109, TextCode: "AC面宽高尺寸不一致" },
//   { NumberCode: 50070112, TextCode: "BD面宽和AC面高不一致" },
//   { NumberCode: 50080103, TextCode: "旋转B面" },
//   { NumberCode: 50080104, TextCode: "旋转D面" },
//   { NumberCode: 50080105, TextCode: "旋转A面" },
//   { NumberCode: 50080106, TextCode: "旋转C面" },
//   { NumberCode: 60070107, TextCode: "AD面宽高尺寸不一致" },
//   { NumberCode: 60070108, TextCode: "BC面宽高尺寸不一致" },
//   { NumberCode: 60070110, TextCode: "AD面和E面宽不一致" },
//   { NumberCode: 60070111, TextCode: "AD面和BC面高不一致" },
//   { NumberCode: 60070112, TextCode: "BC面宽和E面高不一致" },
//   { NumberCode: 60080101, TextCode: "旋转A面" },
//   { NumberCode: 60080102, TextCode: "旋转D面" },
//   { NumberCode: 60080103, TextCode: "旋转B面" },
//   { NumberCode: 60080104, TextCode: "旋转C面" },
//   { NumberCode: 60080106, TextCode: "旋转E面" },
//   { NumberCode: 70070107, TextCode: "AC面宽高尺寸不一致" },
//   { NumberCode: 70070108, TextCode: "BD面宽高尺寸不一致" },
//   { NumberCode: 70070110, TextCode: "AC面和E面宽不一致" },
//   { NumberCode: 70070111, TextCode: "AC面和BD面高不一致" },
//   { NumberCode: 70070112, TextCode: "BD面宽和E面高不一致" },
//   { NumberCode: 70080101, TextCode: "旋转A面" },
//   { NumberCode: 70080102, TextCode: "旋转C面" },
//   { NumberCode: 70080103, TextCode: "旋转B面" },
//   { NumberCode: 70080104, TextCode: "旋转D面" },
//   { NumberCode: 70080106, TextCode: "旋转E面" },
//   { NumberCode: 80070101, TextCode: "BD面宽高尺寸不一致" },
//   { NumberCode: 80070102, TextCode: "CE面宽高尺寸不一致" },
//   { NumberCode: 80070113, TextCode: "BD面和A面宽不一致" },
//   { NumberCode: 80070114, TextCode: "BD面和CE面高不一致" },
//   { NumberCode: 80070115, TextCode: "CE面宽和A面高不一致" },
//   { NumberCode: 80070104, TextCode: "FG面宽高尺寸不一致" },
//   { NumberCode: 80070105, TextCode: "HI面宽高尺寸不一致" },
//   { NumberCode: 80070116, TextCode: "FG面和J面宽不一致" },
//   { NumberCode: 80070117, TextCode: "FG面和HI面高不一致" },
//   { NumberCode: 80070118, TextCode: "HI面宽和J面高不一致" },
//   { NumberCode: 80080108, TextCode: "旋转B面" },
//   { NumberCode: 80080109, TextCode: "旋转D面" },
//   { NumberCode: 80080110, TextCode: "旋转C面" },
//   { NumberCode: 80080111, TextCode: "旋转E面" },
//   { NumberCode: 80080107, TextCode: "旋转A面" },
//   { NumberCode: 80080113, TextCode: "旋转F面" },
//   { NumberCode: 80080114, TextCode: "旋转G面" },
//   { NumberCode: 80080115, TextCode: "旋转H面" },
//   { NumberCode: 80080116, TextCode: "旋转I面" },
//   { NumberCode: 80080112, TextCode: "旋转J面" },
//   { NumberCode: 90070119, TextCode: "BC面宽高尺寸不一致" },
//   { NumberCode: 90080117, TextCode: "旋转B面" },
//   { NumberCode: 90080118, TextCode: "旋转C面" },
// ]