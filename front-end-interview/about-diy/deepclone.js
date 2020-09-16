
// method 1
const newObj = JSON.parse(JSON.stringify(oldObj))

// method 2
const clone = parent => {
  const isType = (obj, type) => {
    if(typeof obj !== 'object') return false
    const typeString = Object.prototype.toString.call(obj)
    let flag;
    switch(type) {
      case 'Array':
        flag = typeString === '[object Array]';
        break;
      case 'Date':
        flag = typeString === '[object Date]';
        break;
      case 'RegExp':
        flag = typeString === '[object RegExp]';
        breakl
      default:
        flag = false
    }
    return flag
  }

  
}