/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 入参是头结点 
const hasCycle = function (head) {

  while (head) {
    if (head.flag) {
      return true
    } else {
      head.flag = true
      head = head.next
    }
  }
  return false
}