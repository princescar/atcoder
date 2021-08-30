const input = require('fs').readFileSync('/dev/stdin', 'utf8').split('\n');

const [_a, _bc, s] = input;
const [_b, _c] = _bc.split(' ');
const [a, b, c] = [_a, _b, _c].map(x => parseInt(x));

const sum = a + b + c;

console.log('%d %s', sum, s);