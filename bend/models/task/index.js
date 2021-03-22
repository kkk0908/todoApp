const Task = require("./taskModel");

exports.insertTask = (task) => Task.create(task);

exports.editTask = (task, id) => Task.findByIdAndUpdate({ _id: id, }, task, { new: true, });

exports.getAllTask = () => Task.find().sort('position')

exports.getTask = (_id) => Task.findOne({ _id })

exports.getTaskByName = (name) => Task.findOne({ name })

exports.getTaskCount = () => Task.count()

exports.removeTask = (id) => Task.deleteOne({ _id: id, });