
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

/**************************解法一*********************************/
var middleNode = function(head) {
    let A = [head];
    while (A[A.length - 1].next != null) A.push(A[A.length - 1].next);
    return A[Math.trunc(A.length / 2)];
  };
/**************************解法一*********************************/

/**************************解法二*********************************/
  var middleNode = function(head) {
    slow = fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};
/**************************解法二*********************************/