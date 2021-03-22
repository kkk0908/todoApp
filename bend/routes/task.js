const express = require("express")
const taskRouter = express.Router()
const taskController = require("../controllers").task;
const { Joi, celebrate, errors } = require("celebrate")

taskRouter.get("/getTask", celebrate({
    query: Joi.object().keys({
        id: Joi.string().required()
    })
}), errors(), (request, response) => {
    taskController.getTaskById(request.query.id).then(res => response.status(res.status).json(res),
        err => response.status(err.status).json(err))
});

taskRouter.get("/getAllTask", (request, response) => {
    taskController.getAllTasks().then(res => response.status(res.status).json(res),
        err => response.status(err.status).json(err))
});

taskRouter.post("/", (request, response) => {
    // post method
});

taskRouter.put("/editTask",
    //  celebrate({
    //     body: Joi.object().keys({
    //         tasks: Joi.array()
    //     })
    // }), errors(),
    (request, response) => {
        console.log(request.body);
        taskController.editTask(request.body).then(res => response.status(res.status).json(res),
            err => response.status(err.status).json(err))
    });

taskRouter.delete("/deleteTask", celebrate({
    query: Joi.object().keys({
        id: Joi.string().required()
    })
}), errors(), (request, response) => {
    taskController.deleteTask(request.query.id).then(res => response.status(res.status).json(res),
        err => response.status(err.status).json(err))
});

taskRouter.post(
    "/createTask",
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            status: Joi.string().valid("todo", "done").default("todo"),
            deadline: Joi.date().required()
        }),
    }),
    errors(),
    (request, response) => {
        taskController.createTask(request.body).then(
            (res) => response.status(res.status).json(res),
            (err) => response.status(err.status).json(err)
        );
    }
);

module.exports = taskRouter;