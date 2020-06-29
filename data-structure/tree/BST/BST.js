
/*
* parameter: data:本节点的数据；left：做节点；right：右节点
*/
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}
function BST() {
  this.root = null;
  this.insert = insert;
}
/*
* parameter: data:本节点的数据；
* 创建节点示例并插入到二叉树的正确位置
*/
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
}
function BST() {
  this.root = null;
  this.insert = insert;
}
function insert(data) {
  var node = new Node(data, null, null);
  if (this.root == null) {
    this.root = node;
  } else {
    var current = this.root;
    while (true) {
      if (current.data > data) {
        if (current.left === null) {
          current.left = node;
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = node;
          break;
        }
        current = current.right;
      }
    }
  }
}

var bst = new BST();
bst.insert(5);
bst.insert(3);
bst.insert(7);
bst.insert(2);
