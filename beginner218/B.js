const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const p = input.split(' ').map(x => parseInt(x));
const A = 'a'.charCodeAt(0);

const str = p
  .map(x => String.fromCharCode(A + x - 1))
  .join('');

console.log(str);