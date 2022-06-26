/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const removeNthFromEnd = function (head, n) {
  const dummy = new ListNode();
  dummy.next = head;
  let fast = dummy;
  let slow = dummy;
  while (n !== 0) {
    fast = fast.next;
    n--
  }

  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }

  slow.next = slow.next.next

  return dummy.next
}