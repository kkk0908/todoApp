const jsonwebtoken = {};
const jwt = require("jsonwebtoken");

/**
 * Generate Identity for particular user.
 *
 * @param {string} expiresIn
 * @param {Object} payload
 *
 */

jsonwebtoken.generateJWT = async (payload, expiresIn) => {
  try {
    payload = Object.assign({ isDiff: false }, payload);
    return jwt.sign(payload, "secretkey", { expiresIn });
  } catch (error) {
    console.log(error);
    return false;
  }
};

jsonwebtoken.validateJWT = (token) => {
  let payload = jwt.verify(token, "secretkey");
  if (payload) return payload;
  return false;
};

module.exports = jsonwebtoken;
