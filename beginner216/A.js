const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [x, y] = input.split('.').map(x => parseInt(x));

if (y < 3) console.log(`${x}-`);
else if (y < 7) console.log(x);
else console.log(`${x}+`);