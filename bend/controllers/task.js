
const taskController = {};
const httpStatus = require("../constants/customHttpStatus")
const errorHandler = require("../utils/errorHandler")
const taskModelMethod = require("../models/task")

taskController.getAllTasks = async () => {
    try {
        let tasks = await taskModelMethod.getAllTask()
        return { ...httpStatus.FETCHED, tasks }
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

taskController.getTaskById = async (id) => {
    try {
        let TaskObj = await taskModelMethod.getTask(id)
        if (!TaskObj) return httpStatus.NOT_FOUND
        return { ...httpStatus.FETCHED, TaskObj }
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}



taskController.deleteTask = async (id) => {
    try {
        let taskObj = await taskModelMethod.getTask(id)
        if (!taskObj) return httpStatus.NOT_FOUND
        let deletedTaskObj = await taskModelMethod.removeTask(id)
        return httpStatus.DELETED
    } catch (error) {
        console.log()
        return errorHandler.errorHandlerMain(error)
    }
}

taskController.editTask = async (tasks) => {
    try {
        const promises = tasks.map(async (task, index) => {
            let orderkey = index + 1;
            task.position = orderkey
            const promise = await taskModelMethod.editTask(task, task._id)
            // const promise = Faq.updateOne({ _id: o._id }, { $set: { position: orderkey } });
            return promise;

        });
        const results = await Promise.all(promises);
        // let taskObj = await taskModelMethod.editTask(task, id)
        return { ...httpStatus.UPDATED, taskObj: results }
    } catch (error) {
        console.log(error)
        return errorHandler.errorHandlerMain(error)
    }
}

taskController.createTask = async (task) => {
    try {
        let existedTask = await taskModelMethod.getTaskByName(task.name)
        if (existedTask) return { ...httpStatus.BAD_REQUEST, message: "Task with same name already existed!" }
        let taskCount = await taskModelMethod.getTaskCount()
        task.position = taskCount + 1
        let taskObj = await taskModelMethod.insertTask(task)
        return { ...httpStatus.CREATED, taskObj }
    } catch (error) {
        console.log(error)
        return errorHandler.errorHandlerMain(error)
    }
}

module.exports = taskController;