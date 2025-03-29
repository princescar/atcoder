const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_n, ..._xy] = input.split('\n');
const n = parseInt(_n);
const points = _xy.slice(0, n).map(x => x.split(' ').map(y => parseInt(y)));

const xMap = new Map(), yMap = new Map();
for (const [x, y] of points) {
  if (!xMap.has(x)) xMap.set(x, []);
  xMap.get(x).push(y);
  if (!yMap.has(y)) yMap.set(y, []);
  yMap.get(y).push(x);
}

for (const [x, y] of points) {
  const yList = xMap.get(x);
  const xList = yMap.get(y);
}