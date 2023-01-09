const mongoose = require("mongoose");

const MongoMessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    content: {
        type: String,
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chat"
    }
}, {
    timestamps: true
});

const mongoMessageModel = mongoose.model("message", MongoMessageSchema);

module.exports = mongoMessageModel;