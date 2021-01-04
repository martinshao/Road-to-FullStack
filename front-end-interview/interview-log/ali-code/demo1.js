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

const json = {
  tag: 'list',
  children: [
    {
      tag: 'item',
      children: 'content1'
    },
    {
      tag: 'item',
      children: 'content2'
    },
    {
      tag: 'item',
      children: 'content3'
    },
    {
      tag: 'item',
      children: [
        {
          tag: 'name',
          children: 'hema'
        },
        {
          tag: 'value',
          children: 'frontend'
        }
      ]
    }
  ]
}

// 开始标签头
const startTagOpen = /^<([\w\-]+)/,
  // 开始标签尾
  startTagClose = /^\s*(\/?)>/,
  // 结束标签
  endTag = /^<\/([\w\-]+)>/;

function xml2json(xml) {
  let root; // AST根节点
  let currentParent; // 当前父节点
  let stack = []; // 节点栈

  XMLParser(xml, {
    start(tag) {
      let element = {
        tag,
        children: [],
      };
      if (!root) {
        root = element;
      }
      if (currentParent) {
        currentParent.children.push(element);
      }
      currentParent = element;
      stack.push(element);
    },
    end() {
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
    },
    chars(text) {
      currentParent.children = text;
    },
  });
  return root;
}

function XMLParser(xml, handler) {
  const tagStack = []; // 标签栈
  let index = 0;
  while (xml) {
    xml = xml.trim();
    let textEnd = xml.indexOf('<');
    if (textEnd === 0) {
      // 匹配开始标签
      let startTagMatch = parseStartTag();
      if (startTagMatch) {
        handleStartTag(startTagMatch);
        continue;
      }
      // 匹配结束标签
      let endTagMatch = xml.match(endTag);
      if (endTagMatch) {
        let curIndex = index;
        advance(endTagMatch[0].length);
        parseEndTag(endTagMatch[1], curIndex, index);
        continue;
      }
    } else {
      // 处理文本内容
      let text, rest, next;
      if (textEnd > 0) {
        rest = xml.slice(textEnd);
        console.info(rest)
        while (!endTag.test(rest) && !startTagOpen.test(rest)) {
          // 处理小于号等其他文本
          next = rest.indexOf('<', 1);
          if (next < 0) break;
          textEnd += next;
          rest = xml.slice(textEnd);
        }
        text = xml.substring(0, textEnd);
        advance(textEnd);
      }
      if (textEnd < 0) {
        text = xml;
        xml = '';
      }
      if (handler.chars) {
        handler.chars(text);
      }
    }
  }

  function parseStartTag() {
    let startExp = xml.match(startTagOpen);
    if (startExp) {
      let match = {
        tagName: startExp[1],
        start: index,
      };
      advance(startExp[0].length);
      let end;
      end = xml.match(startTagClose);
      if (end) {
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    const tagName = match.tagName;
    tagStack.push({tag: tagName});
    if (handler.start) {
      handler.start(tagName);
    }
  }

  function parseEndTag(tagName, start, end) {
    let pos;
    if (start === null) start = index;
    if (end === null) end = index;
    if (tagName) {
      const needle = tagName.toLowerCase();
      for (pos = tagStack.length - 1; pos >= 0; pos--) {
        if (tagStack[pos].tag.toLowerCase() === needle) {
          break;
        }
      }
    }
    if (pos >= 0) {
      console.info(pos)
      for (let i = tagStack.length - 1; i >= pos; i--) {
        if (handler.end) {
          handler.end();
        }
      }
      tagStack.length = pos;
    }
  }

  function advance(n) {
    index += n;
    xml = xml.substring(n);
  }
}

console.log(JSON.stringify(xml2json(xml)) === JSON.stringify(json))
