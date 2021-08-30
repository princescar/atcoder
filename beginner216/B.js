const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_n, ...names] = input.split('\n');
const set = new Set();
for (const name of names) {
  if (set.has(name)) {
    console.log('Yes');
    return;
  } else {
    set.add(name);
  }
}
console.log('No');