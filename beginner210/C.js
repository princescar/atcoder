const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_nk, _c] = input.split('\n');
const [_n, _k] = _nk.split(' ');
const k = parseInt(_k);
const c = _c.split(' ').map(x => parseInt(x));

let counts = new Map();
for (let i = 0; i < k; i++) {
  counts.set(c[i], (counts.get(c[i]) || 0) + 1);
}

let max = counts.size;
for (let i = 0; i < c.length - k; i++) {
  if (counts.get(c[i]) === 1) {
    counts.delete(c[i]);
  } else {
    counts.set(c[i], counts.get(c[i]) - 1);
  }

  const j = i + k;
  counts.set(c[j], (counts.get(c[j]) || 0) + 1);

  if (counts.size > max) {
    max = counts.size;
  }
}

console.log(max);