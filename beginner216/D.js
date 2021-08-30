const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');
const [_nm, ..._ka] = input.split('\n');
let [n, m] = _nm.split(' ').map(x => parseInt(x));
const cylinders = [];
for (let i = 0; i < m; i++) {
  const arr = _ka[2 * i + 1].split(' ').map(x => parseInt(x));
  cylinders[i] = arr;
}
const pointers = new Array(m).fill(0);
const map = new Map();
let count = 0, changed = new Set(new Array(m).fill(0).map((_, i) => i));
while (count < n) {
  const next = new Set();
  for (const i of changed) {
    const cylinder = cylinders[i];
    const pointer = pointers[i];
    if (pointer < 0) continue;
    const color = cylinder[pointer];
    const j = map.get(color);
    if (j == null) {
      map.set(color, i);
    } else {
      pointers[i]++;
      pointers[j]++;
      if (pointers[i] === cylinders[i].length)
        pointers[i] = -1;
      if (pointers[j] === cylinders[j].length)
        pointers[j] = -1;
      next.add(i);
      next.add(j);
      count++;
    }
  }
  if (next.size === 0) {
    console.log('No');
    return;
  }
  changed = next;
}
console.log('Yes');