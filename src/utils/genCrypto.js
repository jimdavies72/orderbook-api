const getCryptoString = () => {
  const crypto = require("crypto");
  return crypto
    .randomBytes(32)
    .toString("hex")
};

console.log(getCryptoString());

module.exports = { getCryptoString };

