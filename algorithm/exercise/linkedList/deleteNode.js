/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    let newNode = null
    let current = this.head
    while(!newNode) {
        if (current.val === node) {
            newNode = current
        } else {
            current = current.next()
        }
    }
    console.info(newNode)
};

function Node(val) {
    this.val = val;
    this.next = null;
}

/**
 * 将数组转为链表
 * @param {Array} array 
 */
var  fromArray = function(array) {
    if (Array.isArray(array)) {
        let currentNode = this.head;
        for (let i = 0; i < array.length; i++) {
            if (currentNode.val === undefined) {
                currentNode.val = array[i];
            } else {
                let newNode = new Node(array[i]);
                currentNode.next = newNode;
                currentNode = newNode;
            }
        }
    } else {
        throw 'the param is not Array';
    }
}

function LinkedList() {
    this.head = new Node('head');
    this.fromArray = fromArray
    this.deleteNode = deleteNode
}

let l1 = new LinkedList();
l1.fromArray([1,2,3,4,5,6]);
console.info(l1)