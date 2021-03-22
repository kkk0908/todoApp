
const signUpController = {};
const userModelMethod = require("../models/user")
const errorHandler = require("../utils/errorHandler")
const httpStatus = require("../constants/httpStatus")
const hashingHandler = require("../utils/hashingHandler")

signUpController.signUp = async (user) => {
    try {
        let existedEmail = await userModelMethod.findUserByCond({ email: user.email })
        if (existedEmail) return { ...httpStatus.BAD_REQUEST, message: "Email Already Existed" }
        user.password = await hashingHandler.hashingValue(user.password)
        let userObj = await userModelMethod.insertUser(user)
        delete userObj._doc.password
        return { ...httpStatus.OK, message: "signUp Successfull!", userObj }
    } catch (error) {
        console.log(error);
        return errorHandler.errorHandlerMain(error)
    }
}

module.exports = signUpController;