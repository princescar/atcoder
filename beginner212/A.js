const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [a, b] = input.split(' ').map(x => parseInt(x));

if (a > 0 && b > 0) console.log('Alloy');
else if (a > 0) console.log('Gold');
else console.log('Silver');