const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

console.log(input === 'Hello,World!\n' ? 'AC' : 'WA');