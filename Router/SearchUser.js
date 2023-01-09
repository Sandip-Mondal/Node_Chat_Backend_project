const UserModel = require("../Schema/UserSchema");

const SearchUserForSingleChat = async (req, res) => {
    try {
        const { search } = req.params;
        const User = await UserModel.find({ $or: [{ name: { $regex: search,$options: "i" } }, { email: { $regex: search, $options: "i" } }] }).find({ _id: { $ne: req.User._id } });
        res.status(200).send(User);
    } catch (err) {
        console.log(err);;
    }
}

const searchUserForGroupChat = async (req,res) => {
    try {
        const { email } = req.params;
        const User = await UserModel.findOne({ _id: { $ne: req.User._id }, email });
        res.status(200).json(User);
    } catch (err) {
        console.log(err);
    }
}




module.exports = { SearchUserForSingleChat, searchUserForGroupChat }