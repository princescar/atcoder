const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_hwc, ..._square] = input.split('\n');
const [h, w, c] = _hwc.split(' ').map(x => parseInt(x));

const square = [];
for (let i = 0; i < h; i++) {
  const line = _square[i].split(' ');
  square[i] = [];
  for (let j = 0; j < w; j++) {
    square[i][j] = parseInt(line[j]);
  }
}

let min = Infinity;

function search(a, b) {
  const limit = Math.floor((min - square[a][b] - 1) / c);
  for (let i = Math.max(0, a - limit); i < Math.min(h, a + limit + 1); i++) {
    const remain = limit - i;
    for (let j = Math.max(0, b - remain); j < Math.min(w, b + remain + 1); j++) {
      if (i === a && j === b) continue;
      const cost = g(a, b, i, j);
      if (cost < min) {
        min = cost;
      }
    }
  }
}

let counter = 0;

function g(a, b, x, y) {
  // console.log(a, b, x, y);
  if (x < 0 || x >= h) return Infinity;
  if (y < 0 || y >= w) return Infinity;
  const result = square[a][b] + Math.abs(x - a) * c + Math.abs(y - b) * c + square[x][y];
  // console.log(`(${a},${b}) -> (${x},${y}) = ${square[a][b]} + ${Math.abs(x - a)} * ${c} + ${Math.abs(y - b)} * ${c} + ${square[x][y]} = ${result}`);
  counter++;
  return result;
}

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    search(i, j);
  }
}

console.log(min);
console.log('counter', counter);
