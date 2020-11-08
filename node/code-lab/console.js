console.log(`当前工作目录是: ${process.cwd()}`);

__dirname

const path = require('path');

const path1 = path.join(__dirname, '/foo');
const path2 = path.join(__dirname, './foo/bar');
const path3 = path.join('/foo', 'bar', '/baz/apple', 'aaa', '..');
const path4 = path.join('foo', 'bar', 'baz');

console.log(path1);
console.log(path2);
console.log(path3);
console.log(path4);