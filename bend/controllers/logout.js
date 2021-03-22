
const logoutController = {};
const httpStatus = require("../constants/customHttpStatus")
const userModelMethods = require("../models/user")
const jwtHandler = require("../utils/jwtHandler")
const tokenModelMethod = require("../models/token")


logoutController.logout = async (token) => {
    try {
        let userObj = jwtHandler.validateJWT(token)
        await tokenModelMethod.deleteToken(token)
        await userModelMethods.editUser({ loginStatus: false }, userObj._doc._id)
        return httpStatus.LOGOUT
    } catch (error) {
        console.log(error)
        return httpStatus.INTERNAL_SERVER_ERROR
    }

}

module.exports = logoutController;