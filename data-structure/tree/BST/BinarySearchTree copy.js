
function BinarySearchTree() {
  let Node = function (key) {
    this.key = key
    this.left = null
    this.right = null
  }

  this.insert = function (key) {
    let newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  let root = null

  this.getRoot = function() {
    return root
  }
}

function insertNode(node, newNode) {

  if (newNode.key < node.key) {
    if (node.left === null) {
      node.left = newNode
    } else {
      insertNode(node.left, newNode)
    }
  } else {
    if (node.right === null) {
      node.right = newNode
    } else {
      insertNode(node.right, newNode)
    }
  }
}

let tree = new BinarySearchTree()
tree.insert(19)
tree.insert(10)
tree.insert(20)

var Point = function (x,y) {
  this.x = x;
  this.y = y;
};
var p = new Point(4,-5);
var q = Point(3,8);

console.log(typeof q);    // "undefined"
