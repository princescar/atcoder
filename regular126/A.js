const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_t, ..._cases] = input.split('\n');
const t = parseInt(_t);
const cases = _cases.slice(0, t).map(x => x.split(' ').map(y => parseInt(y)));

make10(cases);

function make10(cases) {
  for (let [n2, n3, n4] of cases) {
    console.log(max10(n2, n3, n4));
  }
}

function max10(n2, n3, n4) {
  const c1 = Math.min(Math.floor(n3 / 2), Math.floor(n4));
  n3 -= c1 * 2;
  n4 -= c1;
  const c2 = Math.min(Math.floor(n4 / 2), Math.floor(n2));
  n4 -= c2 * 2;
  n2 -= c2;
  const c3 = Math.min(Math.floor(n3 / 2), Math.floor(n2 / 2));
  n3 -= c3 * 2;
  n2 -= c3 * 2;
  const c4 = Math.floor(n2 / 5);
  n2 -= c4 * 5;
  return c1 + c2 + c3 + c4;
}