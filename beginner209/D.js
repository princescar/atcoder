const fs = require('fs');
const input = fs.readFileSync('/dev/stdin', 'utf8');

const [_nq, ..._arr] = input.split('\n');
const [n, q] = _nq.split(' ').map(x => parseInt(x));

const paths = _arr.slice(0, n - 1).map(x => x.split(' ').map(y => parseInt(y)));
const queries = _arr.slice(n - 1, n - 1 + q).map(x => x.split(' ').map(y => parseInt(y)));

const dist = [];
for (let i = 1; i <= n; i++) {
  dist[i] = [];
  dist[i][i] = 0;
}
for(let i = 0; i < queries.length; i++) {
  const [a, b] = queries[i];
  dist[a][b] = '?';
}

for(let k = 0; k < paths.length; k++) {
  const [a, b] = paths[k];
  const temp = [];
  for (let i = 1; i < dist[a].length; i++) {
    if (dist[a][i] == null) continue;
    for (let j = 1; j < dist[b].length; j++) {
      if (dist[b][j] == null) continue;
      if (!temp[i]) temp[i] = [];
      if (!temp[j]) temp[j] = [];
      temp[i][j] = temp[j][i] = dist[a][i] ^ dist[b][j] ^ 1;
    }
  }

  for (let i = 1; i < temp.length; i++) {
    if (!temp[i]) continue;
    for (let j = 1; j < temp[i].length; j++) {
      if (temp[i][j] != null) dist[i][j] = temp[i][j];
    }
  }
}

for(let i = 0; i < queries.length; i++) {
  const [a, b] = queries[i];
  console.log(dist[a][b] ? 'Road' : 'Town');
}
