const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [a, b] = input.split(' ').map(x => parseInt(x));

if (a < b) {
  console.log(b - a + 1);
} else {
  console.log(0);
}