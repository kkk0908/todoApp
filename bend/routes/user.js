const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers").user;
const { Joi, celebrate, errors } = require("celebrate")

userRouter.get("/getUser", celebrate({
  query: Joi.object().keys({
    id: Joi.string().required()
  })
}), errors(), (request, response) => {
  userController.getUserById(request.query.id).then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

userRouter.get("/getAllUser", (request, response) => {
  userController.getAllUsers().then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

userRouter.post("/", (request, response) => {
  // post method
});

userRouter.put("/editUser", celebrate({
  query: Joi.object().keys({
    id: Joi.string().required()
  }),
  body: Joi.object().keys({
    fields: Joi.object().keys({
      name: Joi.string(),
      mobile: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      designation: Joi.string(),
      role: Joi.string()
    }),
    files: Joi.object().keys({
      image: Joi.object()
    }).unknown()
  })
}), errors(), (request, response) => {
  console.log("<<<<<<<<<<<<<")
  userController.editUser({ ...request.body, id: request.query.id }).then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

userRouter.delete("/deleteUser", celebrate({
  query: Joi.object().keys({
    id: Joi.string().required()
  })
}), errors(), (request, response) => {
  userController.deleteUser(request.query.id).then(res => response.status(res.status).json(res),
    err => response.status(err.status).json(err))
});

userRouter.post(
  "/getUserByToken",
  celebrate({
    body: Joi.object().keys({
      token: Joi.string().required(),
    }),
  }),
  errors(),
  (request, response) => {
    userController.getUserByToken(request.body).then(
      (res) => response.status(res.status).json(res),
      (err) => response.status(err.status).json(err)
    );
  }
);

module.exports = userRouter;