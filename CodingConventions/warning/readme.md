# 前端常见warning级别错误收集

### 1. `Unexpected string concatenation`

``` js
// bad 💩
const str = "Hello, " + name + "!";

// good 🌞
const const = `Hello, ${name}!`;

// more examples ✨
const str = `Time: ${12 * 60 * 60 * 1000}`;
```

### 2. `Unexpected console statement`

``` js
/* eslint no-console: "error" */

console.log("Log a debug level message.");
console.warn("Log a warn level message.");
console.error("Log an error level message.");
```

### 3. `Missing radix parameter`

``` js
var num = parseInt("071");      // 57

var num = parseInt("071", 10);  // 71
```

### 4. `This line has a length of 90. Maximum allowed is 80`