

const HiddenPage = async(req,res)=>{
    try{
        res.status(200).json(req.User);
    }catch(err){
        console.log(err);
    }
}


module.exports = HiddenPage;