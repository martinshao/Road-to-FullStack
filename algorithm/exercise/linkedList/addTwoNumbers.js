
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
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
    }

    if (carried) {
        // 还有位没进呢
        previousNode.next = new ListNode(carried)
    } else {
        previousNode.next = null;
    }

    return head;
};