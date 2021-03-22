// eslint-disable-next-line no-unused-vars
const User = require("./userModel");

exports.insertUser = (user) => User.create(user);

exports.editUser = (user, id) => User.findByIdAndUpdate({ _id: id, }, user, { new: true, });

exports.findUser = (id) => User.findOne({ _id: id, }).select(['-password'])

exports.findUserByFilter = (filter) => User.findOne(filter)

exports.findUserByCond = (cond) => User.findOne(cond)

exports.findAllUsers = () => User.find().select(['-password'])

exports.removeUser = (id) => User.deleteOne({ _id: id, });


