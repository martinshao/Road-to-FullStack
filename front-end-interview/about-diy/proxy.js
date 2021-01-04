'use strict'
// let obj = {};
// let value = 5;

// Object.defineProperty(obj, 'num', {
//   // value: 1,
//   // writable: false,
//   enumerable: true,
//   configurable: true,
//   get: function () {
//     console.info('get...', value);
//     return value;
//   },
//   set: function (newValue) {
//     console.info('set...', newValue);
//     value = newValue;
//   },
// });

function Archiver() {
  var value = null;
  // archive n. 档案
  var archive = [];

  Object.defineProperty(this, 'num', {
    get: function () {
      console.log('执行了 get 操作');
      return value;
    },
    set: function (value) {
      console.log('执行了 set 操作');
      value = value;
      archive.push({val: value});
    },
  });

  this.getArchive = function () {
    return archive;
  };
}

// var proxy = new Proxy(target, handler);

let target = {
  name: 'Martin',
  age: 18,
};

const proxy = new Proxy(target, {
  get: function (obj, prop) {
    console.info('trigger get action...');
    return obj[prop];
  },
  set: function (obj, prop, value) {
    console.info('trigger set action...');
    obj[prop] = value;
  },
});

const xiaoming = {
  name: 'xiaoming',
};

// xiaoming = {} Uncaught TypeError: Assignment to constant variable.

Object.defineProperty(xiaoming, 'name', {
  writable: false,
});

// Object.freeze(xiaoming)

xiaoming.name = 'Martin'
// Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
