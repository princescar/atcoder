const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_n, s] = input.split('\n');
const index = s.indexOf('1');
if (index % 2)  {
  console.log('Aoki');
} else {
  console.log('Takahashi');
}