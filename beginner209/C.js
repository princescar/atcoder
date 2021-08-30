const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_n, _arr] = input.split('\n');
const n = parseInt(_n);
const arr = _arr.split(' ').map(x => parseInt(x));

arr.sort((a, b) => a - b);

let count = 1n;
for (let i = 0; i < arr.length; i++) {
  const j = BigInt(arr[i]) - BigInt(i);
  if (j > 0) {
    count = (count * j) % 1000000007n;
  } else {
    console.log(0);
    process.exit(0); 
  }
}

console.log(count.toString());