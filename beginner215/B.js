const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const n = BigInt(input);
let k = 0;
for (let x = 1n; x <= n; x *= 2n) k++;
console.log(k - 1);