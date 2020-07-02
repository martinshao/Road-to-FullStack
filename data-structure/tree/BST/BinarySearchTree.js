
class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }

  insertNode(newNode) {
    if (newNode.data < this.data) {
      if (!this.left) {
        this.left = newNode
      } else {
        this.left.insertNode(newNode)
      }
    } else {
      if (!this.right) {
        this.right = newNode
      } else {
        this.right.insertNode(newNode)
      }
    }
  }
}

class BinarySearchTree {
  constructor(arr) {
    if (arr.length === 0) return
    this.root = new Node(arr.shift())
    arr.forEach((el) => {
      this.root.insertNode(new Node(el))
    });
  }

  // 插入对象
  insert(newNode) {
    this.root.insertNode(newNode)
  }

  // 广度遍历
  breadthTraversal() {
    const queue = [this.root]
    let node
    const arr = []
    while (queue.length > 0) {
      node = queue.shift()
      arr.push(node.data)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    return arr
  }

  //后序遍历
  // postOrder2() {
  //   // 这个方法有问题，稍后研究
  //   let node = this.root
  //   let flag = ''
  //   const arr = [], stack = [], dirStack = []
  //   while (node || stack.length) {
  //     if (node.left) {
  //       stack.push(node)
  //       node = node.left
  //       dirStack.push('left')
  //     } else if (node.right) {
  //       stack.push(node)
  //       node = node.right
  //       dirStack.push('right')
  //     } else {
  //       arr.push(node.data)
  //       node = stack.pop()
  //       node && (dirStack.pop() === 'left' ? node.left = null : node.right = null)
  //     }
  //   }
  //   return arr
  // }

  postOrder() {
    const node = this.root
    const arr = [], stack = []

    // stack < BTNode *> s;
    // BinTree * p=root;
    // BTNode * temp;
    // while (node || stack.length) {
    //   while (node)              //沿左子树一直往下搜索，直至出现没有左子树的结点 
    //   {
    //     BTNode * btn=(BTNode *)malloc(sizeof(BTNode));
    //     btn -> btnode=p;
    //     btn -> isFirst=true;
    //     s.push(btn);
    //     p = p -> lchild;
    //   }

    //   if (!s.empty()) {
    //     temp = s.top();
    //     s.pop();
    //     if (temp -> isFirst == true)     //表示是第一次出现在栈顶 
    //     {
    //       temp -> isFirst=false;
    //       s.push(temp);
    //       p = temp -> btnode -> rchild;
    //     }
    //     else//第二次出现在栈顶 
    //     {
    //       cout << temp -> btnode -> data << "";
    //       p = NULL;
    //     }
    //   }
    // }
  }
}

// const BST = new BinarySearchTree([9, 6, 11, 7, 19, 8, 20, 5])
const BST = new BinarySearchTree([23, 45, 16, 37, 3, 99, 22])
