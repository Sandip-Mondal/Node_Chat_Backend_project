const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../Schema/UserSchema");

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await UserModel.findOne({ email });
        if (!email || !password) {
            res.status(400).json({ msg: "plz fill the data" });
        }else if (!User) {
            res.status(401).json({ msg: "plz sign in" });
        }
        else {
            const check = await bcrypt.compare(password, User.password);
            if (check) {
                const token = await User.addToken();
                res.cookie("JWT", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 123456987)
                });

                res.status(200).json({ msg: "successfully log in" });
            }else{
                res.status(402).json({msg:"password not matching !"})
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = Login;