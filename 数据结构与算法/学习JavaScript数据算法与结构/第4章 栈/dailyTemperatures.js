const dailyTemperatures = function (T) {
  const len = T.length;
  const stack = []
  const res = new Array(T).fill(0);

  for (let i = 0; i < len; i++) {
    while (stack.length && T[i] > T[stack[stack.length - 1]]) {
      const top = stack.pop();
      res[top] = i - top
    }
    stack.push[i]
  }
  return res;
}