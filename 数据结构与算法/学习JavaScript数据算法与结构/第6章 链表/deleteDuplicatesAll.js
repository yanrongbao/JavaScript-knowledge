const deleteDuplicatesAll = function (head) {
  if (!head || !head.next) return head;

  const dummy = new ListNode();

  dummy.next = head;

  let cur = dummy

  while (cur.next && cur.next.next) {
    if (cur.next.val === cur.next.next.val) {
      const val = cur.next.val;
      while (cur.next && cur.next.val === val) {
        cur.next = cur.next.next
      }
    } else {
      cur = cur.next
    }
  }
  return dummy.next
}