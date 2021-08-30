const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

const n = 0;
const arr = [];

const compare = (a, b) => new Promise(resolve => {
  const question = `? ${arr[a]} ${arr[b]}\n`;
  rl.question(question, resolve);
});

async function main(input) {
  const [n, q] = input.split(' ').map(x => parseInt(x));
  const A = 'A'.charCodeAt(0);

  for (let i = 0; i < n; i++) {
    arr[i] = String.fromCharCode(A + i);
  }

  await sort(0, n);
  console.log(`! ${arr.join('')}`);
  process.exit(0);
}

function swap(a, b) {
  const tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

async function sort(a, b) {
  if (a >= b - 1) return;
  const pairs = Math.floor((b - a) / 2);
  for (let i = 0; i < pairs; i++) {
    const result = await compare(arr[a + 2 * i], arr[a + 2 * i + 1]);
    if (result === '>') {
      swap(a + 2 * i, a + 2 * i + 1);
    }
  }
}

rl.on('line', (input) => {
  if (n === 0) {
    main(input);
  }
});
