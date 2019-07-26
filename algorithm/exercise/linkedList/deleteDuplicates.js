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

let l1 = ArrayToLinkedList([1,1,2,3,4,5]);
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    let curr = head
    while( curr !== null && curr.next !== null) {
        if (curr.val === curr.next.val) {
            curr = curr.next.next
        } else {
            curr = curr.next
        }
    }
    return head
};