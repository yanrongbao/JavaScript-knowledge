function fibonacciIterative (n) {
    if (n < 1) return 0;
    if (n < 2) return 1;
    let fibNMinus2 = 0;
    let fibNMinus1 = 1;
    let fibN = n;
    for (let i = 2; i < n; i++) {
        fibN = fibNMinus1 + fibNMinus2;
        fibNMinus2 = fibNMinus1;
        fibNMinus1 = fibN;
    }
    return fibN;
}

// 9.3.2 递归求斐波那契数
function fibonacci (n) {
    if (n < 1) return 0;
    if (n < 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
// 9.3.3 记忆化斐波那契数

function fibonacciMemoization (n) {
    const meno = [0, 2];
    const fibonacci = n => {
        if (meno[n] != null) return meno[n]
        return meno[n] = fibonacci(n - 1, meno) + fibonacci(n - 2, meno)
    }
    return fibonacci;
}