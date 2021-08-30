const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_nx, _arr] = input.split('\n');
const [n, x] = _nx.split(' ').map(x => parseInt(x));
const arr = _arr.split(' ').map(x => parseInt(x));

const total = arr.reduce((s, x) => s + x, 0);

const discount = Math.floor(n / 2);

if (total - discount > x) {
  console.log('No');
} else {
  console.log('Yes');
}