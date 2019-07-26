function Node(element) {
    this.element = element;
    this.next = null;
}

function LinkedList() {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

//插入一个元素
function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        document.write(currNode.next.element + '&nbsp;');
        currNode = currNode.next;
    }
}

let LinkedList = (function () {

    class Node { //一个节点
        constructor(element) {
            this.element = element;
            this.next = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();

    class LinkedList {
        constructor() {
            length.set(this, 0);
            head.set(this, null);
        }

        append(element) { //向列表尾部添加一个新的项
            let node = new Node(element),
                current;

            if (this.getHead() === null) {
                head.set(this, node);
            } else {

                current = this.getHead();

                while (current.next) {
                    current = current.next;
                }

                current.next = node;
            }

            let l = this.size();
            l++;
            length.set(this, l);
        }

        insert(position, element) { //向列表的特定位置插入一个新的项

            if (position >= 0 && position <= this.size()) {

                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index = 0;

                if (position === 0) {
                    node.next = current;
                    head.set(this, node);
                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }
                let l = this.size();
                l++;
                length.set(this, l);

                return true;

            } else {
                return false;
            }
        }

        removeAt(position) { //从列表的特定位置移除一项
            if (position > -1 && position < this.size()) {

                let current = this.getHead(),
                    previous,
                    index = 0;

                if (position === 0) {
                    head.set(this, current.next);
                } else {

                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    previous.next = current.next;
                }

                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            } else {
                return null;
            }
        }

        remove(element) { //移除一项

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) { //返回元素在列表中的索引，没有返回-1

            let current = this.getHead(),
                index = 0;

            while (current) {
                if (element === current.element) {
                    return index;
                }
                index++;
                current = current.next;
            }

            return -1;
        }

        isEmpty() { //链表不包含任何元素，返回true，如果长度大于0返回false
            return this.size() === 0;
        }

        size() { //返回链表包含的元素个数
            return length.get(this);
        }

        getHead() { //获取链头项
            return head.get(this);
        }

        toString() { //已string输出链表
            let current = this.getHead(),
                string = '';

            while (current) {
                string += current.element + (current.next ? ', ' : '');
                current = current.next;
            }
            return string;

        }

        print() { //string格式打印到控制台上。
            console.log(this.toString());
        }
    }

    return LinkedList;
})();


function Node(element) {
    this.element = element; //当前节点的元素
    this.next = null; //下一个节点链接
}

function LList() {
    this.head = new Node('head'); //头节点
    this.find = find; //查找节点
    this.insert = insert; //插入节点
    this.display = display; //显示链表
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

var fruits = new LList();

fruits.insert('Apple', 'head');
fruits.insert('Banana', 'Apple');
fruits.insert('Pear', 'Banana');

console.log(fruits.display());


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function Node(value) {
    this.value = value;
    this.next = null;
}

function LinkedList() {
    this.head = new Node('head'); //头节点
    this.find = find; //查找节点
    this.insert = insert; //插入节点
    this.display = display; //显示链表
    this.fromArray = fromArray;
}

function find(item) {
    var currNode = this.head;
    while (currNode.value != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
}

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.value);
        currNode = currNode.next;
    }
}

function fromArray(array) {
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            linkedList.insert(array[i], 'head');
        } else {
            linkedList.insert(array[i], array[i - 1]);
        }
    }
}

let linkedList = new LinkedList();
linkedList.fromArray([2, 4, 3])
linkedList.insert(2, 'head');
linkedList.insert(4, 2);
linkedList.insert(3, 4);

var addTwoNumbers = function (l1, l2) {
    const linkedList1 = new LinkedList();
    const linkedList2 = new LinkedList();
    linkedList1.fromArray(l1)
    linkedList2.fromArray(l2)

    let returnLinkedLink = new LinkedList();

};

let l1 = [2, 4, 3];
let l2 = [5, 6, 4];

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function (l1, l2) {
    var carried = 0; // 用于进位
    const head = new ListNode();
    const noop = {
        val: 0,
        next: null
    };
    let currentL1 = l1;
    let currentL2 = l2;
    let currentNode = head; // 返回的链表的当前node
    let newNode; // 声明在外面节省内存
    let previousNode; // 记录前一个节点，便于删除最后一个节点
    while (currentL1 || currentL2) {
        newNode = new ListNode(0);

        currentNode.val =
            ((currentL1 || noop).val + (currentL2 || noop).val + carried) % 10;

        currentNode.next = newNode;
        previousNode = currentNode;
        currentNode = newNode;

        if ((currentL1 || noop).val + (currentL2 || noop).val + carried >= 10) {
            carried = 1;
        } else {
            carried = 0;
        }

        currentL1 = (currentL1 || noop).next;
        currentL2 = (currentL2 || noop).next;
        console.info('currentL1', currentL1);
    }

    if (carried) {
        // 还有位没进呢
        previousNode.next = new ListNode(carried)
    } else {
        previousNode.next = null;
    }

    return head;
};

let a = [1, 2, 3, , 4];
while (a) {
    a.pop();
    if (a.length === 0) {
        a = null
    }
    console.info(a)
}

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

let l1 = ArrayToLinkedList([2, 4, 3]);

let l2 = ArrayToLinkedList([5, 6, 4]);

let str = "abcabcbb"
let array = str.split('');

let array = "abcabcbb"

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let substring = '';
    for (let i = 0; i < s.length; i++) {
        substring +=s[i]
    }
    return substring
};