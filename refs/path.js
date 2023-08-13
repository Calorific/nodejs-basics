const path = require('path')

console.log(path.dirname(__filename))
console.log(path.basename(__filename))
console.log(path.extname(__filename).slice(1))
console.log(path.parse(__filename))
console.log(path.resolve(__dirname, '..', 'index.js')) // пытается найти определенный файл
console.log(path.join(__dirname, '..', 'index.js')) // конкатенирует строчки
