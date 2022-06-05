function isPalindrome(s) {
  const reverseStr = s.split("").reverse().join("")
  return s === reverseStr
}

function isPalindrome(s) {
  const len = s.length;
  for (let i = 0; i < len / 2; i++) {
    if (s[i] !== s[len - i - 1]) {
      return false
    }
    j--
  }
  return true
}