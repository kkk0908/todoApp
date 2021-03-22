// eslint-disable-next-line no-unused-vars
const Token = require("./tokenModel");

exports.createToken = (token, email) => Token.create({ token, email })

exports.getToken = (email, token) => Token.findOne({ email, token })

exports.deleteToken = (token) => Token.deleteOne({ token })