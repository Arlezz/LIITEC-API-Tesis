var dotenv = require('dotenv');
const process = require('process');
const crypto = require('crypto');

dotenv.config({path: '.env'});
const { DEVELOPER_SECRET } = process.env;

const genAPIKey = () => {
    //create a base-36 string that contains 30 chars in a-z,0-9
    return [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join("");
};

const hash = (value) => {
  const algorithm = "sha256";
  const secret = DEVELOPER_SECRET;
  const hash = crypto.createHmac(algorithm, secret).update(value).digest("hex");
  return hash;
};

module.exports = { genAPIKey, hash };
