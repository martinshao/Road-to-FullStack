
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
    this.root = new Node(arr[0])
    if (arr.length === 0) return
    arr.forEach((el, i) => {
      this.root.insertNode(new Node(arr[i]))
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
      if (node) {
        arr.push(node.data)
        if (node.data) queue.push(node.left)
        if (node.right) queue.push(node.right)
      }
    }
    return arr
  }

  //前序遍历
  preOrder(arr = [], node = this.root) {
    if (node === null) return arr;
    arr.push(node.data)
    this.preOrder(arr, node.left)
    this.preOrder(arr, node.right)
    return arr;
  }
  //中序遍历
  inOrder(arr = [], node = this.root) {
    if (node === null) return arr;
    this.inOrder(arr, node.left)
    arr.push(node.data)
    this.inOrder(arr, node.right)
    return arr;
  }
  //后序遍历
  postOrder(arr, node = this.root) {
    if (node === null) return arr;
    this.postOrder(arr, node.left)
    arr.push(node.data)
    this.postOrder(arr, node.right)
    return arr;
  }

  //前序遍历
  preOrder2() {
    var node = this.root
    var arr = []
    var stack = []
    while (node !== null || stack.length > 0) {
      while (node !== null) {
        stack.push(node)
        arr.push(node.data)
        node = node.left
      }
      //出来的时候node的左树已经遍历完了，此时是null
      if (stack.length > 0) {
        node = stack.pop()
        node = node.right
      }
      //出来后回到大循环的开始，又进入第一个小循环遍历左树
    }
    return arr
  }

}

var BST = new BinarySearchTree([9, 6, 11, 7, 19, 8, 20, 5])