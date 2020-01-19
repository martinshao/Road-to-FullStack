## lint经典错误总结

* Expected no linebreak before this expression            implicit-arrow-linebreak
* Arrow function should not return assignment             no-return-assign
* Unexpected use of comma operator                        no-sequences

### Unexpected use of comma operator

### Unexpected function expression

### Return statement should not contain assignment

### Expected no linebreak before this expression

### Arrow function should not return assignment

#### Unexpected string concatenation

``` ts
export const calcFileSize = (fileSize: number) => {
  if (fileSize < 1024) {
    // return fileSize + 'B' // Unexpected string concatenation
    return `${fileSize} B`
  } else if (fileSize < (1024 * 1024)) {
    let temp = fileSize / 1024; // Unnecessary else after return.
    return temp.toFixed(2) + 'KB'
  } else if (fileSize < (1024 * 1024 * 1024)) {
    let temp = fileSize / (1024 * 1024) // temp is never reassigned. Use const instead.
    return temp.toFixed(2) + 'MB'
  } else {
    let temp = fileSize / (1024 * 1024 * 1024);
    return temp.toFixed(2) + 'GB'
  }
}
```

### antd/es/form import should occur before import of ./data.d

比较严格的校验，会有对import模块先后顺序有要求

### Use object destructuring.

提倡使用解构提出对象的属性