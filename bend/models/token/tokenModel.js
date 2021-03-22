
const mongoose = require("mongoose")


const tokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
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

const Token = mongoose.model("Token", tokenSchema)
Token.createIndexes()
module.exports = Token