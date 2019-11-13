let list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
];
//利用项目的浅拷贝 引用对象使用
function convert(list) {
  const res = [];
  const map = list.reduce((res, v) => ((res[v.id] = v), res), {});
  console.log(map);
  //   {
  // '1': { id: 1, name: '部门A', parentId: 0 },
  //   '2': { id: 2, name: '部门B', parentId: 0 },
  //   '3': { id: 3, name: '部门C', parentId: 1 },
  //   '4': { id: 4, name: '部门D', parentId: 1 },
  //   '5': { id: 5, name: '部门E', parentId: 2 },
  //   '6': { id: 6, name: '部门F', parentId: 3 },
  //   '7': { id: 7, name: '部门G', parentId: 2 },
  //   '8': { id: 8, name: '部门H', parentId: 4 }
  // }
  for (const item of list) {
    if (item.parentId === 0) {
      res.push(item);
      continue;
    }
    if (item.parentId in map) {
      const parent = map[item.parentId];
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  }
  return res;
}
console.log(convert(list));