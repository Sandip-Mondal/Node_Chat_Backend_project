const MongooseChatModel = require("../Schema/ChatSchema");
const mongoMessageModel = require("../Schema/MessageSchema");


const SingleChat = async (req, res) => {
    try {
        const { id } = req.params;

        const isChat = await MongooseChatModel.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.User._id } } },
                { users: { $elemMatch: { $eq: id } } }
            ]
        });
        if (isChat.length == 0) {
            const data = new MongooseChatModel({
                chatName: "sender",
                isGroupChat: false,
                users: [req.User._id, id]
            });
            await data.save();
            const result = await data.populate("latestMessage");
            res.status(200).send(result);

        } else {
            res.status(400).json({ msg: "chat alredy exiy" });
        }
    } catch (err) {
        console.log(err);
    }

}

const fetchChat = async (req, res) => {
    try {
        const chat = await MongooseChatModel.find({ users: { $elemMatch: { $eq: req.User._id } } })
            .populate({ path: "users", select: "-password" }).populate('latestMessage')
            .populate({ path: "groupAdmin", select: "-password" });
        res.status(200).send(chat);
    } catch (err) {
        console.log(err);
    }
}

const sendChatInfo = async (req, res) => {
    try {
        const { chatId } = req.params;
        const data = await MongooseChatModel.findOne({ _id: chatId }).populate({ path: "users", select: '-password' });
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
    }
}


const groupChat = async (req, res) => {
    try {
        const data = new MongooseChatModel({
            chatName: req.body.chatName,
            isGroupChat: true,
            users: [req.User._id, req.body.User._id],
            groupAdmin: req.User
        });
        await data.save();
        res.status(200).json("successfull......");

    } catch (err) {
        console.log(err);
    }
}

const renameGroupName = async (req, res) => {
    try {
        const { chatId, newChatName } = req.params;
        const data = await MongooseChatModel.findByIdAndUpdate(chatId,
            {
                chatName: newChatName,
            },
            {
                new: true,
            }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(data);
    } catch (err) {
        console.log(err);
    }
}

const addToGroup = async (req, res) => {
    try {
        const { chatId, userId } = req.params;
        const isExit = await MongooseChatModel.findOne({
            isGroupChat: true, users: { $elemMatch: { $eq: userId } }
        });


        if (isExit) {
            res.status(400).json({ msg: "User already admit this group" });
        } else {
            const data = await MongooseChatModel.findByIdAndUpdate(chatId,
                {
                    $push: { users: userId },
                },
                { new: true }
            );
            res.status(200).send(data);
        }
    } catch (err) {
        console.log(err);
    }
}

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;
    const remove = await MongooseChatModel.findByIdAndUpdate(chatId,
        {
            $pull: { users: userId },
        },
        { new: true }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!remove) {
        res.status(404).json({ msg: "not remove" });

    } else {
        res.status(200).send(remove);
    }
};


const deleteGroup = async (req, res) => {
    try {
        const { chatId } = req.params;
        await mongoMessageModel.deleteMany({ chat: chatId });
        await MongooseChatModel.deleteOne({ _id: chatId });

        res.status(200).json({ msg: "sucessfullt delete chat" });


    } catch (err) {
        console.log(err);
    }
}





module.exports = { SingleChat, groupChat, fetchChat, sendChatInfo, renameGroupName, addToGroup, removeFromGroup, deleteGroup };