
const userController = {};
const httpStatus = require("../constants/customHttpStatus")
const errorHandler = require("../utils/errorHandler")
const userModelMethod = require("../models/user")
const jwtHandler = require("../utils/jwtHandler")
const fileHandler = require("../utils/fileHandler")
const folderMaker = require("../utils/folderMaker")
const hashingHandler = require("../utils/hashingHandler")
const path = require("path")
const fs = require("fs")

userController.getAllUsers = async () => {
    try {
        let users = await userModelMethod.findAllUsers()
        return { ...httpStatus.FETCHED, users }
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

userController.getUserById = async (id) => {
    try {
        let userObj = await userModelMethod.findUser(id)
        if (!userObj) return httpStatus.NOT_FOUND
        return { ...httpStatus.FETCHED, userObj }
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

userController.getUserByToken = async ({ token }) => {
    try {
        let userObj = jwtHandler.validateJWT(token)
        if (!userObj) return httpStatus.NOT_FOUND
        userObj = userObj._doc
        delete userObj.password
        return { ...httpStatus.FETCHED, userObj }
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

userController.deleteUser = async (id) => {
    try {
        let userObj = await userModelMethod.findUser(id)
        console.log("userObj", userObj);
        if (!userObj) return httpStatus.NOT_FOUND
        let deletedUserObj = await userModelMethod.removeUser(id)
        console.log("deletedUserObj", deletedUserObj);

        let filePathToDelete = path.join(__dirname, "..", "public", userObj.image);
        console.log("filePathToDelete", filePathToDelete, fs.existsSync(filePathToDelete));
        if (fs.existsSync(filePathToDelete))
            await fileHandler.unlinkFileHandler(filePathToDelete)

        return httpStatus.DELETED
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

userController.editUser = async ({ fields, files, id }) => {
    try {

        let user = fields
        let file = files.image
        // await folderMaker.createFolder("user")

        if (file) {
            let fileName = path.join("user", `user${Date.now()}${path.extname(file.name)}`);
            let newPath = path.join(__dirname, "..", "public", fileName);
            let oldPath = file.path;

            let fileInfo = await fileHandler.imageHandler(newPath, fileName, oldPath);
            user.image = fileInfo.fileName;
            newFile = true
        }
        let existedUser = await userModelMethod.findUser(id)

        if (existedUser && existedUser.image && newFile) {
            let filePathToDelete = path.join(__dirname, "..", "public", existedUser.image);
            if (fs.existsSync(filePathToDelete))
                await fileHandler.unlinkFileHandler(filePathToDelete)
        }
        user.password = await hashingHandler.hashingValue(user.password)
        let userObj = await userModelMethod.editUser(user, id)
        return { ...httpStatus.UPDATED, userObj }
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

module.exports = userController;