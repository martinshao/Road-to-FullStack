// good
// In a .vue file
export default {
  data() {
    return {
      foo: 'bar'
    }
  }
}

// 在一个 Vue 的根实例上直接使用对象是可以的，
// 因为只存在一个这样的实例。
new Vue({
  data: {
    foo: 'bar'
  }
})

// bad
export default {
  data: {
    foo: 'bar'
  }
}

// 正例
props: {
  status: String
}
// 更好的做法！
props: {
  status: {
    type: String,
      required: true,
        validator: function (value) {
          return [
            'syncing',
            'synced',
            'version-conflict',
            'error'
          ].indexOf(value) !== -1
        }
  }
}

// 反例
// 这样做只有开发原型系统时可以接受
props: ['status']