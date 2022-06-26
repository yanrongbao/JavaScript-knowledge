function mergeTwoLists(l1, l2) {
  // 创建一个新的节点
  const head = new ListNode();

  let cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l2
      l2 = l2.next
    } else {
      cur.next = l1
      l1 = l1.next
    }
    cur = cur.next
  }

  cur.next = l1 ? l1 : l2

  return head.next
}