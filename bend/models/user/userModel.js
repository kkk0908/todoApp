
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: { type: String, default: "", unique: true, required: true },
    password: { type: String, required: true },
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


const User = mongoose.model("User", userSchema)
User.createIndexes()
module.exports = User