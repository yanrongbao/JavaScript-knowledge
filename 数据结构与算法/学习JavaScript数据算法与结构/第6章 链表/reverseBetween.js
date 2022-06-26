/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
// 入参是头结点、m、n
const reverseBetween = function (head, m, n) {
  let pre, cur, leftHead;
  const dummy = new ListNode();

  dummy.next = head
  // 找到前驱节点
  let p = dummy;

  for (let i = 0; i < m - 1; i++) {
    p = p.next
  }

  leftHead = p
  let start = leftHead.next
  pre = start
  cur = pre.next

  for (let i = m; i < n; i++) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }

  leftHead.next = pre;
  start.next = cur

  return dummy.next
}