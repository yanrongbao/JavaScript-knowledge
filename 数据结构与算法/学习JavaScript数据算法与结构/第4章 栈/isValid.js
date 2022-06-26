const leftToRight = {
  "(": ")",
  "{": "}",
  "[": "]"
}

const isValid = function (s) {
  const len = s.length;
  if (!len) return true;
  const stack = []

  for (let i = 0; i < len; i++) {
    const element = s[i];
    if (element === "(" || element === "{" || element == "[") {
      stack.push(leftToRight[element])
    } else {
      if (stack.length && stack.pop() !== element) {
        return false
      }
    }
  }

  return !stack.length
}