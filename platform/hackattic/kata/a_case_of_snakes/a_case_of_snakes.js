const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.on('line', (input) => {
  const words = input.split(/(?=[A-Z])/);
  const [_, ...rest] = words
  const result =  rest.map(word => word.toLowerCase()).join('_')
  console.log(result)
})