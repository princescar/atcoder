const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_n, s] = input.split('\n');
const n = parseInt(_n);

const result = s[n - 1] === 'o' ? 'Yes' : 'No';
console.log(result);