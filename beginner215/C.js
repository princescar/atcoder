const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [s, _k] = input.split(' ');
const k = parseInt(_k);

const arr = s.split('').sort();
const n = s.length;
const per = [];

let x = 1, i = n - 1, m = 0;
while (x < k) {
  if (arr[i] === arr[i + 1]) m++;
  else m = 1;
  x *= (n - i) / m;
  per[i] = x;
  i--;
}
i++;

let result = arr.splice(0, i).join('');
let y = k - 1;
while (arr.length > 1) {
  i++;
  const j = Math.floor(y / per[i]);
  let r = -1;
  for (let l = 0; l < arr.length; l++) {
    if (arr[l] !== arr[l - 1]) r++;
    if (r === j) {
      result += arr.splice(l, 1);
      break;
    }
  }
  y = y % per[i];
}
result += arr[0];

console.log(result);