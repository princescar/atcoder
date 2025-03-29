const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_nm, ..._segments] = input.split('\n');
const [n, m] = _nm.split(' ').map(x => parseInt(x));
const segments = _segments.slice(0, m).map(x => x.split(' ').map(y => parseInt(y)));

segments.sort((a, b) => Math.abs(a[0] - a[1]) - Math.abs(b[0] - b[1]));

const mask1 = [], mask2 = [];
let count = 0;
for (const [a, b] of segments) {
  let cross = false;
  if (mask1[a] || mask2[b]) continue;
  for (let i = Math.min(a, b) + 1; i < Math.max(a, b); i++) {
    if (mask1[i] || mask2[i]) {
      cross = true;
      break;
    } else {
      mask1[i] = mask2[i] = true;
    }
  }
  if (!cross) count += 1;
}
console.log(count);