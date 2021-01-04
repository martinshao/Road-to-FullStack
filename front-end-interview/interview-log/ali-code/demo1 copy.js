const xml = `
<list>
  <item>content1</item>
  <item>content2</item>
  <item>content3</item>
  <item>
    <name>hema</name>
    <value>frontend</value>
  </item>
</list>
`

class VDom {
  constructor(tag) {
    this.tag = tag
    this.children = []
  }

  get children() {
    return this.children
  }

  set children(child) {
    this.children.push(child)
  }
}

const target = {
  tag: '',
  children: ''
}

// 开始标签头
const startTagOpen = /^<([\w\-]+)/,
// 开始标签尾
startTagClose = /^\s*(\/?)>/, 
// 标签属性
attribute = /^\s*([^\s"'<>\/=]+)(?:\s*((?:=))\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,
// 结束标签
endTag = /^<\/([\w\-]+)>/; 

function parse (html) {
  let root // AST根节点
  let currentParent // 当前父节点
  let stack = [] // 节点栈
  
  HTMLParser(html, {
  // 处理开始标签
  start (tag, attrs, unary) {
    let element = {
      tag,
      attrs,
      attrsMap: attrs.reduce((cumulated, { name, value }) => { 
                  cumulated[name] = value || true;
                  return cumulated;
                }, {}),
      parent: currentParent,
      children: []
    }
    // 初始化根节点
    if (!root) {
      root = element
    }
    // 有父节点，就把当前节点推入children数组
    if (currentParent) {
      currentParent.children.push(element)
    }
    // 不是自闭合标签
    // 进入当前节点内部遍历，故currentParent设为自身
    if (!unary) {
      currentParent = element
      stack.push(element)
    }
  },
  // 处理结束标签
  end () {
    // 出栈，重新赋值父节点
    stack.length -= 1
    currentParent = stack[stack.length - 1]
  },
  // 处理文本节点
  chars (text) {
    text = currentParent.tag === 'pre'
      ? text
      : text.trim() ? text : ' '
    currentParent.children.push(text)
  }
  })
  return root
}

function HTMLParser (html, handler) {
  var tagStack = [];    // 标签栈
  var index = 0;
  while (html) {
      // html 是通过 getOuterHTML 并删除了前后空格，所以第一次textEnd肯定为0
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
          // 匹配开始标签
          var startTagMatch = parseStartTag();
          if (startTagMatch) {
              handleStartTag(startTagMatch);
              continue;
          }
          // 匹配结束标签
          var endTagMatch = html.match(endTag);
          if (endTagMatch) {
              var curIndex = index;
              advance(endTagMatch[0].length);
              parseEndTag(endTagMatch[1], curIndex, index);
              continue;
          }
      }
  }
}

function parseStartTag () {
  var start = html.match(startTagOpen);
  if (start) {
      var match = {
          tagName: start[1],
          attrs: [],
          start: index
      };
      advance(start[0].length);
      var end, attr;
      // 未结束且匹配到标签属性
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push(attr);    // 添加属性
      }
      if (end) {
          advance(end[0].length);
          match.end = index;
          return match;
      }
  }
}

