
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
  constructor(arr = []) {
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

  // 获得二叉树中节点个数
  getNodeNumber(node = this.root) {
    // // 层次遍历（使用队列）==》最快
    // let count = 0;

    // if (node) {
    //   let queue = [];
    //   queue.push(node); // 根节点入队列

    //   while (queue.length) {
    //     node = queue.shift();
    //     count++;  // 只要一个节点出队，计数就加一

    //     if (node.left) {
    //       queue.push(node.left);
    //     }
    //     if (node.right) {
    //       queue.push(node.right);
    //     }
    //   }
    // }
    // return count;

    // 统计二叉树中结点个数的算法 （先根遍历）
    let count = 0;

    if (node) {
      count++;   // 根结点+1
      count += this.getNodeNumber(node.left);  // 加上左子树上结点数
      count += this.getNodeNumber(node.right);  // 加上右子树上结点数
    }

    return count;
  }

  // 获得二叉树中叶子节点的个数
  // getLeafNodeNumber(node = this.root) {
  //   // 层次遍历
  //   let count = 0;  // 计数变量
  //   let queue = [];  // 辅助队列

  //   if (node) {
  //     queue.push(node);
  //     while (queue.length) {
  //       node = queue.shift();
  //       if (node.left) {
  //         queue.push(node.left);
  //       }
  //       if (node.right) {
  //         queue.push(node.right);
  //       }
  //       if (!node.right && !node.left) {
  //         count++;  // 没有左右子节点时计数加一
  //       }
  //     }
  //   }

  //   return count;
  // }

  getLeafNodeNumber(node = this.root) {
    // 每次递归的结束条件
    if (!node) {
      return 0;
    }
    if (!node.left && !node.right) {
      return 1;
    }
    let leftNum = this.getLeafNodeNumber(node.left);
    let rightNum = this.getLeafNodeNumber(node.right);

    return leftNum + rightNum;
  }

  // 获取二叉树的深度
  getTreeDepth(node = this.root) {
    let depth = 0;

    if (node) {
      depth++;

      if (node.left && !node.right) {  // 只有左子树
        depth = this.getTreeDepth(node.left) + 1;
      }
      if (node.right && !node.left) {  // 只有右子树
        depth = this.getTreeDepth(node.right) + 1;
      }
      if (node.left && node.right) {  // 既有右子树又有左子树
        depth = (this.getTreeDepth(node.left) >
          this.getTreeDepth(node.right) ?
          this.getTreeDepth(node.left) : this.getTreeDepth(node.right)) + 1;
      }
    }

    return depth;
  }

  // 计算给定层数节点的个数
  getLevelNodeNumber(level, node = this.root) {
    if (!node) return 0;
    let depth = 1;  // 当前层数为1
    let queue = [];

    queue.push(node);

    if (depth == level) return queue.length;

    while (true) {
      let size = queue.length;  // size保存当前层数节点的个数

      if (size == 0) break;

      while (size) {   // 当前节点全部出队时，队列中保存的就是下一层节点
        node = queue.shift();

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }

        size--;
      }

      depth++;

      if (depth == level) return queue.length;  // 判断是否等于给定层数
    }
  }

  // 判断二叉树是不是完全二叉树
  isCompleteTree(node = this.root) { }

  isCompleteTree1(node = this.root) {
    let queue = [];
    let flag = false;
    queue.push(node);

    while (queue.length) {
      node = queue.shift();

      if (node) {  // 如果节点不空
        if (flag) {
          return false;
        }
        // 关键就在于不管node的left和right是否存在依然加入队列
        queue.push(node.left);
        queue.push(node.right);
      } else {
        flag = true;
      }
    }

    return true;
  }

  isCompleteTree2(node = this.root) {
    let queue = [];
    let noRight = false;
    queue.push(node);

    while (queue.length) {
      node = queue.shift();
      // 如果当前节点只有右孩子节点
      if (!node.left && node.right) {
        return false;
      }

      // 遇到一个非叶子节点且其前面的节点没有右孩子节点
      if ((node.left || node.right) && noRight) {
        return true;
      }

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      } else {
        noRight = true;
      }
    }

    return true;
  }

  // 求二叉树的镜像
  invertTree(node = this.root) {
    // 递归的方法
    if (!node) return;

    // 交换当前节点的左右子树
    let tmpNode = node.left;
    node.left = node.right;
    node.right = tmpNode;

    this.invertTree(node.left);
    this.invertTree(node.right);
  }
}

// const BST = new BinarySearchTree([9, 6, 11, 7, 19, 8, 20, 5])
const BST = new BinarySearchTree([23, 45, 16, 37, 3, 99, 22])
