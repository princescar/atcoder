const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_nm, _a, _b] = input.split('\n');
const [n, m] = _nm.split(' ').map(x => parseInt(x));
const a = _a.split(' ').map(x => parseInt(x));
const b = _b.split(' ').map(x => parseInt(x));

const sa = a.sort((a, b) => a - b);
const sb = b.sort((a, b) => a - b);

if (sb[0] >= sa[sa.length - 1]) {
  console.log(sb[0] - sa[sa.length - 1]);
} else if (sa[0] >= sb[sb.length - 1]) {
  console.log(sa[0] - sb[sb.length - 1]);
} else {
  let i = 0, j = 0, min = Infinity;
  while(i < n && j < m) {
    const diff = Math.abs(sa[i] - sb[j]);
    if (diff < min) min = diff;
    if (min === 0) break;
    if (sa[i] < sb[j]) i++;
    else j++;
  }
  console.log(min);
}