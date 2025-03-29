const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [n] = input.split('\n');

console.log(leading1(n));

function leading1(n) {
  let count = 0;
  let free = false;
  for (let i = 0; i < n.length; i++) {
    const digit = parseInt(n[i]);
    if (digit > 1) free = true;
    let add = 0;
    if (free) {
      add = Math.pow(10, n.length - i - 1);
    } else {
      if (digit === 0) break;
      if (i + 1 < n.length) {
        add = parseInt(n.substring(i + 1)) + 1;
      } else if (digit > 0) {
        add = 1;
      }
    }
    count += add;
  }
  if (n.length > 1) {
    count += leading1('9'.repeat(n.length - 1));
  }
  return count;
}