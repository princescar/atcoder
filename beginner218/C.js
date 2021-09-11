const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_n, ..._st] = input.split('\n');
const n = parseInt(_n);
const s = _st.slice(0, n).map(x => x.split('').map(y => y === '#' ? 1 : 0));
const t = _st.slice(n, 2 * n).map(x => x.split('').map(y => y === '#' ? 1 : 0));

if (count(s) !== count(t)) {
  console.log('No');
  return;
}

let x = -1, y = -1;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (s[i][j]) {
      x = i;
      y = j;
      break;
    }
  }
  if (x >= 0 && y >= 0) break;
}

const match = rotate0() || rotate90() || rotate180() || rotate270();
console.log(match ? 'Yes' : 'No');

function count(matrix) {
  let c = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j]) c++;
    }
  }
  return c;
}

function rotate0() {
  let x1 = -1, y1 = -1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (t[i][j]) {
        x1 = i;
        y1 = j;
        break;
      }
    }
    if (x1 >= 0 && y1 >= 0) break;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!s[i][j]) continue;
      const [a, b] = [i - x, j - y];
      const [i1, j1] = [x1 + a, y1 + b];
      if (i1 < 0 || i1 >= n || j1 < 0 || j1 >= n ||
        s[i][j] !== t[i1][j1]) return false;
    }
  }
  return true;
}

function rotate90() {
  let x1 = -1, y1 = -1;
  for (let j = n - 1; j >= 0; j--) {
    for (let i = 0; i < n; i++) {
      if (t[i][j]) {
        x1 = i;
        y1 = j;
        break;
      }
    }
    if (x1 >= 0 && y1 >= 0) break;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!s[i][j]) continue;
      const [a, b] = [i - x, j - y];
      const [i1, j1] = [x1 + b, y1 - a];
      if (i1 < 0 || i1 >= n || j1 < 0 || j1 >= n ||
        s[i][j] !== t[i1][j1]) return false;
    }
  }
  return true;
}

function rotate180() {
  let x1 = -1, y1 = -1;
  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (t[i][j]) {
        x1 = i;
        y1 = j;
        break;
      }
    }
    if (x1 >= 0 && y1 >= 0) break;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!s[i][j]) continue;
      const [a, b] = [i - x, j - y];
      const [i1, j1] = [x1 - a, y1 - b];
      if (i1 < 0 || i1 >= n || j1 < 0 || j1 >= n ||
        s[i][j] !== t[i1][j1]) return false;
    }
  }
  return true;
}

function rotate270() {
  let x1 = -1, y1 = -1;
  for (let j = 0; j < n; j++) {
    for (let i = n - 1; i >= 0; i--) {
      if (t[i][j]) {
        x1 = i;
        y1 = j;
        break;
      }
    }
    if (x1 >= 0 && y1 >= 0) break;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!s[i][j]) continue;
      const [a, b] = [i - x, j - y];
      const [i1, j1] = [x1 - b, y1 + a];
      if (i1 < 0 || i1 >= n || j1 < 0 || j1 >= n ||
        s[i][j] !== t[i1][j1]) return false;
    }
  }
  return true;
}


// - Select the very top left cell of the shape s as origin:
//   - Rotate 90 degrees, it will become the very top right cell on t.
//   - Rotate 180 degrees, it will become the very bottom right cell on t.
//   - Rotate 270 degrees, it will become the very bottom left cell on t.
//   - No matter how to translate t, the origin position must be present.
// - All other cells should be present on the t.
// - Assume the origin cell is (x, y), another cell is (i, j):
//   - After the rotation, the origin cell is (x1, y1).
//   - The relative coordinate is (i - x, j - y), denote with (a, b).
//   - Rotate 90 degrees, there should be a cell (x1 + b, y1 - a).
//   - Rotate 180 degrees, there should be a cell (x1 - a, y1 - b).
//   - Rotate 270 degrees, there should be a cell (x1 - b, y1 + a).