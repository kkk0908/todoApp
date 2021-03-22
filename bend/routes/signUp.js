
const express = require("express")
const signUpRouter = express.Router()
const signUpController = require("../controllers").signUp;
const { Joi, celebrate, errors } = require('celebrate')

signUpRouter.get("/", (request, response) => {
  // get method
});

signUpRouter.post("/", celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
}), errors(), (request, response) => {
  signUpController.signUp(request.body).then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

signUpRouter.put("/", (request, response) => {
  // put method
});

signUpRouter.delete("/", (request, response) => {
  // delete method
});

module.exports = signUpRouter;