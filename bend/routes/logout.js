const express = require("express")
const logoutRouter = express.Router()
const logoutController = require("../controllers").logout;

logoutRouter.get("/", (request, response) => {
  logoutController.logout(request.user.token).then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

logoutRouter.post("/", (request, response) => {
  // post method
});

logoutRouter.put("/", (request, response) => {
  // put method
});

logoutRouter.delete("/", (request, response) => {
  // delete method
});

module.exports = logoutRouter;