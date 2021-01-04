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
`;

class VDom {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
  }

  get children() {
    return this.children;
  }

  set children(child) {
    this.children.push(child);
  }
}

const target = {
  tag: '',
  children: '',
};

// 开始标签头
const startTagOpen = /^<([\w\-]+)/,
  // 开始标签尾
  startTagClose = /^\s*(\/?)>/,
  // 结束标签
  endTag = /^<\/([\w\-]+)>/;

function parse(html) {
  let root; // AST根节点
  let currentParent; // 当前父节点
  let stack = []; // 节点栈

  HTMLParser(html, {
    // 处理开始标签
    start(tag, attrs, unary) {
      let element = {
        tag,
        attrs,
        parent: currentParent,
        children: [],
      };
      if (!root) {
        root = element;
      }
      if (currentParent) {
        currentParent.children.push(element);
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      }
    },
    end() {
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
    },
    chars(text) {
      text = currentParent.tag === 'pre' ? text : text.trim() ? text : ' ';
      currentParent.children.push(text);
    },
  });
  return root;
}

function HTMLParser(html, handler) {
  var tagStack = []; // 标签栈
  var index = 0;
  while (html) {
    html = html.trim();
    // html 是通过 getOuterHTML 并删除了前后空格，所以第一次textEnd肯定为0
    var textEnd = html.indexOf('<');
    if (textEnd === 0) {
      // 匹配开始标签
      var startTagMatch = parseStartTag();
      console.info(startTagMatch);
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
    } else {
      // 处理文本内容
      var text, rest, next;
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (!endTag.test(rest) && !startTagOpen.test(rest)) {
          // 处理小于号等其他文本
          next = rest.indexOf('<', 1);
          if (next < 0) break;
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }
      if (textEnd < 0) {
        text = html;
        html = '';
      }
      if (handler.chars) {
        handler.chars(text);
      }
    }
  }

  function parseStartTag() {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index,
      };
      advance(start[0].length);
      var end;
      end = html.match(startTagClose);
      if (end) {
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    var tagName = match.tagName;
    tagStack.push({tag: tagName, attrs: ''});
    if (handler.start) {
      handler.start(tagName, '', false, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    var pos;
    if (start == null) start = index;
    if (end == null) end = index;
    if (tagName) {
      var needle = tagName.toLowerCase();
      for (pos = tagStack.length - 1; pos >= 0; pos--) {
        if (tagStack[pos].tag.toLowerCase() === needle) {
          break;
        }
      }
    }
    if (pos >= 0) {
      for (var i = tagStack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end(tagStack[i].tag, start, end);
        }
      }
      tagStack.length = pos;
    }
  }

  function advance(n) {
    index += n; // index用于记录剩余字符串在原字符串中的位置
    html = html.substring(n);
  }
}

console.info(parse(xml));
