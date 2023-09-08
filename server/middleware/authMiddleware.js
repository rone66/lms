const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");

//auth

exports.Auth=async(req,res,next)=>{
    try {
        //extract token
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "") ;
        //console.log(token);

        //if token missing
        if (!token) {
            return res.status(401).json({
                success:false,
                message:"token missing",
            })
        }
        //verify the token
        try{
            const decode= jwt.verify(token,process.env.SECRET);
            console.log(decode);

            req.user=decode;
        }catch(err){
            //verification issue
            return res.status(400).json({
                success:false,
                message:"error in token decoding",
            });

        }    
        next();  
    } catch(err) {
        return res.status(401).json({
            success:false,
            message:"something went wrong, while verifying student",
        })
    }
}


//isStudent


exports.isStudent= (req,res,next)=>{
    try{
        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
            message:"this is restricted for student",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"user role not matching",
        })
    }
}

//isInstructor


exports.isInstructor=(req,res,next)=>{
    try{
        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
            message:"this is restricted for Instructor",
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"user role not matching",
        })
    }
}

//isAdmin

exports.isAdmin=(req,res,next)=>{
    try{
        
        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
            message:"this is restricted for admin",
            })
        }
        next();
    }catch(err){
        return res.status(401).json({
            success:false,
            message:"user role not matching",
        })
    }
}