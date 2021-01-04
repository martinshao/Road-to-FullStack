// ID选择器 priority: 1000
const idReg = /#[a-z]*/;
// 类选择器 priority: 100
const classReg = /^\.[a-z]*/;
// 属性选择器 priority: 100
const attrReg = /^[a-z]{3,5}\[[a-z]*\=[a-z]*\]/;
// 伪类，这里列举常用的 priority: 100
const pseudoElementSelector = [
  '::after',
  '::before',
  '::selection',
  '::last-child',
];
// 标签 priority: 10
const tagReg = /^[a-z]*$/;
// 伪元素很多，这里列举常用的 priority: 10
const pseudoClassSelector = [
  ':hover',
  ':active',
  ':focus',
  ':link',
  ':visited',
];

// 策略
const priorityStrategy = {
  idRegFn: function (str) {
    if (idReg.test(str)) {
      return 1000;
    }
  },
  classRegFn: function (str) {
    if (classReg.test(str)) {
      return 100;
    }
  },
  attrRegFn: function (str) {
    if (attrReg.test(str)) {
      return 100;
    }
  },
  pseudoClassSelectorFn: function (str) {
    if (pseudoClassSelector.some((item) => str.includes(item))) {
      return 100;
    }
  },
  tagFn: function (str) {
    if (tagReg.test(str)) {
      return 10;
    }
  },
  pseudoElementSelectorFn: function (str) {
    if (pseudoElementSelector.some((item) => str.includes(item))) {
      return 10;
    }
  },
};

const trim = (str) => str.trim();
const filter = (item) => !['>', '+'].includes(item);

function getPriority(str) {
  const strategise = Object.keys(priorityStrategy);
  return str
    .split(' ')
    .map(trim)
    .filter(filter)
    .reduce((acc, curr) => {
      let result = 0;
      for (const iterator of strategise) {
        result = priorityStrategy[iterator](curr) || 0;
        if (result !== 0) break;
      }
      return acc + result;
    }, 0);
}

function compare(a, b) {
  let priority_a = 0;
  let priority_b = 0;

  priority_a = getPriority(a);
  priority_b = getPriority(b);
  
  return priority_a - priority_b;
}

console.info(compare('#container > .element', 'body > .element')); // 990
console.info(compare('body', '.element')); // -90
console.info(compare('.element + .element::last-child', '.element:hover')); // 10
console.info(compare('input[type=text]', 'li:hover')) // 0
