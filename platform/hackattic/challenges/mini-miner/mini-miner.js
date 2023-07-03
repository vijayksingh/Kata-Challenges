let https = require('https');
let crypto = require('crypto')

// STATUS: DONE

const alphabeticalJSON = (json) => {
  const keys = Object.keys(json)
  keys.sort();
  let result = {}
  for (let key of keys) {
    if(typeof json[key] === 'object' && !Array.isArray(json[key]) && json[key] !== null) {
      result[key] = alphabeticalJSON(json[key])
    } else {
      result[key] = json[key]
    }
  }
  return result;
}

const generateHash = (json) => {
  const str = JSON.stringify(json).trim()
  return crypto.createHash('sha256').update(str).digest('hex')
}

const getNonce = async () => {
  return new Promise((resolve, reject) => {
    https.get("https://hackattic.com/challenges/mini_miner/problem?access_token=a5d839c98b60e490", (res) => {
      res.on('data', (d) => {
        const json = JSON.parse(d.toString())
        const {difficulty, block} = json;
        let nonce = 1;
        let lastNbit;
        let expected = "".padStart(Math.ceil(difficulty/4), "0");
        const sortedJSON = alphabeticalJSON(block)
        while (lastNbit !== expected) {
          sortedJSON.nonce = nonce;
          const hash = generateHash(sortedJSON)
          lastNbit = hash.slice(0, Math.ceil(difficulty/4))
          console.log(nonce)
          nonce++
        }
      })
    })
  })
}


(async () => {
  const nonce = await getNonce();
})()

