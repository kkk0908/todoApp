const errorHandlerMethods = require("../utils/errorHandler");
const mv = require("mv");
const path = require("path");
const fs = require("fs");


/**
 * This is a method to rename the path of a image file.
 *
 * @param {string} filePath
 * @param {string} fileName
 * @param {string}  oldFilePath
 *
 */

exports.imageHandler = (filePath, fileName, oldFilePath) => {
  return new Promise((resolve, reject) => {
    if (
      path.extname(filePath) === ".png" ||
      path.extname(filePath) === ".jpg" ||
      path.extname(filePath) === ".svg" ||
      path.extname(filePath) === ".jpeg"
    ) {
      mv(oldFilePath, filePath, { mkdirp: true }, (err) => {
        if (err) {
          console.log(err);
          errorHandlerMethods.errorHandlerMain(err);
        }
        console.log("uploaded", { filePath: filePath, fileName: fileName });
        resolve({ filePath, fileName });
      });
    } else {
      reject({ name: "fileExt" });
    }
  });
};

/**
 * This is a method to unlink a file.
 *
 * @param {string} filePath
 *
 */

exports.unlinkFileHandler = (filePath) => {
  return new Promise((resolve, reject) => {
    console.log("DOES FILE EXISTS ? ", fs.existsSync(filePath));
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("error in unlink file", err);
        return reject(errorHandlerMethods.serverErrorHandler());
      } else console.log("File Removed From The Server");
      resolve("File Removed From The Server");
    });
  });
};


