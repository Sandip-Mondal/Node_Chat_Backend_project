
const mongoMessageModel = require("../Schema/MessageSchema");



const MessageSent = async (req, res) => {
    try {
        const { chat } = req.body;

        const data = await mongoMessageModel.find({ chat }).populate({ path: "sender", select: "name email number" })
            .populate("chat");
        res.status(200).send(data);

    } catch (err) {
        console.log(err);
    }
}



module.exports = MessageSent;