const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');
let n = BigInt(input);

const result = [];
while (n > 0) {
  if (n % 2n) {
    result.unshift('A');
    n = n - 1n;
  } else {
    result.unshift('B');
    n = n / 2n;
  }
}
console.log(result.join(''));