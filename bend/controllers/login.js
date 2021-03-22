
const loginController = {};
const httpStatus = require("../constants/customHttpStatus")
const userModelMethods = require("../models/user")
const jwtHandler = require("../utils/jwtHandler")
const hashingHandler = require("../utils/hashingHandler")
const tokenModelMethod = require("../models/token")

loginController.login = async (user) => {
    try {
        let userObj = await userModelMethods.findUserByCond({ email: user.email })
        if (!userObj) return { ...httpStatus.NOT_FOUND, "message": "Your Email Id Is Not Registered!" }
        console.log(userObj, user);
        let password = await hashingHandler.comparingValue(user.password, userObj.password)
        if (!password) return { ...httpStatus.NOT_FOUND, "message": "Incorrect Password!" }
        delete userObj.password
        let token = await jwtHandler.generateJWT(userObj, "24h")
        await tokenModelMethod.createToken(token, user.email)
        delete userObj._doc.password
        return { ...httpStatus.CREATED, message: "Login Successfull!", token, userObj }
    } catch (error) {
        console.log(error)
        return httpStatus.INTERNAL_SERVER_ERROR
    }

}

module.exports = loginController;