
const MongooseChatModel = require("../Schema/ChatSchema");
const mongoMessageModel = require("../Schema/MessageSchema");

const GetMessage = async (req, res) => {
    try {
        const { content, chatId } = req.body;
        const data = new mongoMessageModel({
            sender: req.User,
            content: content,
            chat: chatId
        });

        const data1 = await data.save();
        await MongooseChatModel.updateOne({ _id: chatId }, {
            $set: {
                latestMessage: data,
            }
        });

        const data2 = await mongoMessageModel.find({ chatId }).populate({ path: "sender", select: "name email" })
            .populate("chat");
        res.status(200).send(data1);
    } catch (err) {
        console.log(err);
    }
}



module.exports = GetMessage;