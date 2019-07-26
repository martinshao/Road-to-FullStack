/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function() {
    let array = this.toArray()
    array = array.reverse()
    return  this.fromArray(array)
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

var  toArray = function() {
    const array = new Array();
    let currentNode = this.head.next;

    while (currentNode) {
        array.push(currentNode.val);
        currentNode = currentNode.next;
    }
    return array
}

function LinkedList() {
    this.head = new Node('head');
    this.toArray = toArray;
    this.fromArray = fromArray;
    this.reverse = reverseList;
}

let l1 = new LinkedList();
l1.fromArray([1,2,3,4,5]);
console.info(l1)

function ListNode(val) {
    this.val = val;
    this.next = null;
}

function ArrayToLinkedList(array) {
    if (Array.isArray(array)) {
        let head = new ListNode();
        let currentNode = head;
        for (let i = 0; i < array.length; i++) {
            if (currentNode.val === undefined) {
                currentNode.val = array[i];
            } else {
                let newNode = new ListNode(array[i]);
                currentNode.next = newNode;
                currentNode = newNode;
            }
        }
        return head;
    } else {
        throw 'the param is not Array';
    }
}

function LinkedListToArray(linkedList) {
    const array = new Array();
    let currentNode = linkedList;

    while (currentNode) {
        array.push(currentNode.val);
        currentNode = currentNode.next;
        console.info(array)
    }
    return array
}

let l1 = ArrayToLinkedList([1,2,3,4,5]);
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if (head === null || head.val === undefined || head.next === null) {
        return head
    }
    const array = new Array();
    while (head) {
        array.push(head.val);
        head = head.next;
    }
    array.reverse()
    let reverse = new ListNode();
    let currentNode = reverse;
    for (let i = 0; i < array.length; i++) {
        if (currentNode.val === undefined) {
            currentNode.val = array[i];
        } else {
            let newNode = new ListNode(array[i]);
            currentNode.next = newNode;
            currentNode = newNode;
        }
    }
    return reverse;
};

var reverseList = function(head) {
    let prev = null;
    let curr = head;
    while (curr !== null) {
        let nodeTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nodeTemp;
    }
    return prev;
};

var reverseList = function(head) {
    if (head == null || head.next == null) return head;
    let p = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return p;
};

reverseList(l1)