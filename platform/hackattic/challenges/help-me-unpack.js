const https = require("https");

const getData = async () => {
  return new Promise((resolve, reject) => {
    https.get(
      "https://hackattic.com/challenges/help_me_unpack/problem?access_token=a5d839c98b60e490",
      (res) => {
        res
          .on("data", (d) => {
            const bytes = JSON.parse(d.toString()).bytes;

            const response = Buffer.from(bytes, "base64");
            const int = response.readIntLE(0, 4); //
            const uint = response.readUIntLE(4, 4); //
            const short = response.readInt16LE(8);
            const float = response.readFloatLE(12);
            const double = response.readDoubleLE(16);
            const big_endian_double = response.readDoubleBE(24);

            res.on("end", () => {
              resolve({
                int,
                uint,
                short,
                float,
                double,
                big_endian_double,
              });
            });
          })
          .on("error", (e) => {
            reject(e);
          });
      }
    );
  });
};

const postData = async (data) => {
  const options = {
    hostname: "hackattic.com",
    path: '/challenges/help_me_unpack/problem?access_token=a5d839c98b60e490',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }
  return new Promise((resolve, reject) => {
    https.request(options, (res) => {
      res.on('data', (d) => {
        resolve("Success");
      })
    }).on('error', (e) => {
      console.log(e);
    })
  })
}

(async () => {
  const data = await getData();
  console.log(data);
  const result = await postData(data);
})();
