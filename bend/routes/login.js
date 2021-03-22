const express = require("express")
const loginRouter = express.Router()
const loginController = require("../controllers").login;
const { Joi, celebrate, errors } = require('celebrate')

loginRouter.get("/", (request, response) => {
  // get method
});

loginRouter.post("/", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),

  })
}), errors(), (request, response) => {
  loginController.login(request.body).then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

loginRouter.put("/", (request, response) => {
  // put method
});

loginRouter.delete("/", (request, response) => {
  // delete method
});

module.exports = loginRouter;