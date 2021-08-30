const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [n, a, x, y] = input.split(' ').map(x => parseInt(x));

let result = n * x;
if (n > a) {
  result -= (n - a) * (x - y);
}

console.log(result);