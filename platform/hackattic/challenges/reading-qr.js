const http = require('http');

const options = {
  hostname: 'hackattic.com',
  port: 80,
  path: '/challenges/help_me_unpack/problem?access_token=a5d839c98b60e490',
  method: 'GET'
};

const req = http.request(options, (res) => {
  res.on('data', d => {
    console.log(d.toString());
  })
})


req.on('error', error => {
  console.error(error)
})

req.end();