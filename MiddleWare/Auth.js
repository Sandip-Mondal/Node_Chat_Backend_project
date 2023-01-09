const jwt = require("jsonwebtoken");
const UserModel = require("../Schema/UserSchema");

const Auth = async(req,res,next)=>{
    try{
        const token = req.cookies.JWT;
        const verify = jwt.verify(token,process.env.SECRET_KEY);
        const User = await UserModel.findOne({_id:verify._id, token:token});
        if(!User){
            throw new Error("Invlid Error!");
        }
        req.User = User;
        next();
    }catch(err){
        res.status(400).json("inValid Here !");
        console.log(err);
    }
}


module.exports = Auth;

