// 文件切片
function fileSilce(file, piece = 1024 * 1024 * 5) {
    let totalSize = file.size;//文件总大小
    let start = 0;// 每次上传的开始字节
    let end = start + piece;// 每次上传的结尾字节
    let chunks = [];
    while (start < totalSize0) {
        // 根据长度截取每次需要上传的数据
        // File对象继承自Blob对象，因此包含slice方法
        let blob = file.slice(start, end);
        chunks.push(blob);
        start = end;
        end = start + piece;
    }
    return chunks
}

let file = document.querySelector("[name=file]").files[0];
const LENGTH = 1024 * 1024 * 0.1;
let contenx = createContent(file);
let record = getUploadSliceRecord(context);
let chunks = slice(file, LENGTH); // 首先拆分切片
let tasks = [];
chunks.forEach((chunk, index) => {

    if (record.includes(index)) return;
    let fd = new FormData();
    fd.append('file', chunk);
    // 传递context
    fd.append('context', contenx);
    // 传递切片索引值
    fd.append('chunk', index + 1);

    let task = post("/mkblk.php", fd).then(resp => {
        saveUploadSliceRecord(context, index);
        record.push(index);
    })
    tasks.push(task);
});

// 所有切片上传完毕后，调用mkfile接口
Promise.all(tasks).then(resp => {
    let fd = new FormData();
    fd.append("context", context);
    fd.append("chunks", chunks.length);
    post("/mkfile.php", fd).then(res => {
        console.log(res);
    });
})

//测试时记得修改nginx的server配置，否则大文件可能会提示413 Request Entity Too Large的错误
// server {
//     // ...
//     client_max_body_size 50m;
// }

function createContent(file) {
    return file.name + file.length;
}

// 获取已上传切片记录
function getUploadSliceRecord(context) {
    let record = localStorage.getItem(context)
    if (!record) {
        return []
    } else {
        try {
            return JSON.parse(record)
        } catch (e) { }
    }
}
// 保存已上传切片
function saveUploadSliceRecord(context, sliceIndex) {
    let list = getUploadSliceRecord(context)
    list.push(sliceIndex)
    localStorage.setItem(context, JSON.stringify(list))
}
