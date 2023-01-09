const mongoose = require("mongoose");

const MongooseChatSchema = new mongoose.Schema({
    chatName: {
        type: String,
        required: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "USER"
        }
    ],
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
    },
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message"
    },
}, {
    timestamps: true
});


const MongooseChatModel = mongoose.model("chat", MongooseChatSchema);

module.exports = MongooseChatModel;