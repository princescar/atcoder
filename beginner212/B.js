const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const digits = [];
for (let i = 0; i < 4; i++) digits.push(parseInt(input[i]));

if (
  digits[0] === digits[1] &&
  digits[0] === digits[2] &&
  digits[0] === digits[3]
) {
  console.log('Weak');
  return;
}

let follow = true;
for (let i = 1; i < digits.length; i++) {
  if (digits[i] !== (digits[i - 1] + 1) % 10) {
    follow = false;
    break;
  }
}

console.log(follow ? 'Weak' : 'Strong');