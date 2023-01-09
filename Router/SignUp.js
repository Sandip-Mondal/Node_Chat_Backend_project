const UserModel = require("../Schema/UserSchema");


const signUp = async(req,res)=>{
    try{
        const {name,email,number,gender,password} = req.body;
        const User = await UserModel.findOne({email});
        if(!name || !email || !number || !gender || !password){
            res.status(400).json({msg:"plz fill the data"});
        }
        else if(User){
            res.status(401).json({msg:"User already exit"});
        }
        else{
            const User = new UserModel({name,email,number,gender,password});
            await User.save();
            res.status(200).json({msg:"Successfull signin"});
        }
    }catch(err){
        console.log(err);
    }
}


module.exports = signUp;