/**
 * 
 * @param {Object} element 
 */
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

/**
 * 将数组转为链表
 * @param {Array} array 
 */
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

/**
 * 将链表转为数组
 * @param {LinkedList} linkedList 
 */
function LinkedListToArray(linkedList) {
    const array = new Array();
    let currentNode = linkedList;

    while (currentNode) {
        array.push(currentNode.val);
        currentNode = currentNode.next;
    }
    return array
}