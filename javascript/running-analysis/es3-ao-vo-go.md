# javascript AO VO GO

``` js
activeExecutionContext = {
    VO: {...}, // or AO
    this: thisValue,
    Scope: [ // Scope chain
      // 所有变量对象的列表
      // for identifiers lookup
    ]
};
```

``` js
Scope = AO + [[Scope]]
```

``` js
foo.[[Scope]] = [
  globalContext.VO
];
```
