
const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ["todo", "done"] },
    deadline: { type: Date, },
    position: { type: Number }
}, {
    timestamps: true,
    toObject: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    },

})


const Task = mongoose.model("Task", taskSchema)
Task.createIndexes()
module.exports = Task