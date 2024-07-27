const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config();

const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;
auth = (req,res,next)=>{
    try{
        let token=req.cookies.token;
        if(token){
            let user=jwt.verify(token,JWT_SECRET_KEY);
            if(!user) return res.status(401).json({message:"unauthorised user"});
            req.userId=user.id;
        }
        else{
            return res.status(401).json({message:"unauthorised user"});
        }
    }catch(error){
        return res.status(401).json({message:"unauthorised user"});
    }

    next();
};

module.exports=auth;