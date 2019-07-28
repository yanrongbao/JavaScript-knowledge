// 深度优先遍历
let deepTraversal1 = (node, nodeList = []) => {
    if (node !== null) {
        nodeList.push(node);
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            deepTraversal1(children[i], nodeList)
        }
    }
    return nodeList;
}

let deepTraversal2 = (node) => {
    let nodes = [];
    if (node !== null) {
        nodes.push(node);
        let children = node.children;
        for (let i = 0; i < children.length; i++) {
            nodes = nodes.concat(deepTraversal2(children[i]));
        }
    }
}
let deepTraversal3 = (node) => {
    let stack = [];
    let nodes = [];
    if (node) {
        // 推入当前处理的node
        stack.push(node);
        while (stack.length) {
            let item = stack.pop();
            let children = item.children;
            nodes.push(item);

            for (let i = children.length - 1; i >= 0; i--) {
                stack.push(children[i]);
            }
        }
    }
    return nodes;
}

// 广度优先遍历 BFS
let widthTraversal2 = (node) => {
    let nodes = [];
    let stack = [];
    if (node) {
        stack.push(node);
        while (stack.length) {
            let item = stack.shift();
            let children = item.children;
            nodes.push(item);
            for (let i = 0; i < children.length; i++) {
                stack.push(children[i])
            }
        }
    }
    return nodes;
}