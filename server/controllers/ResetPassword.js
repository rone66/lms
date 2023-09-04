const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto");

//resetPasswordToken
exports.resetPasswordToken=async(req,res)=>{
    try {
    //get email from req body
    const email= req.body.email;

    //check user for this email
    const user= await User.findOne({email:email});
    if(!user){
        res.status(400).json({
            sucess:false,
            message:'your Email is not registered with us'

        })
    }

    //generate token

    const token=crypto.randomUUID();

    //update user by adding token and expiration time
    
    const updatedDetails= await User.findOneAndUpdate({email:email},
        {
            token:token,
            restPasswordExpires:Date.now() + 5*60*1000,
        },{new:true}
);

    //create url

    const url=`http://localhost:3000/update-password/${token}`

    //send mail containing the url
    await mailSender(email,"Password Reset",`Your Link for email verification is ${url}. Please click this url to reset your password.`)

    return res.status(200).json({
        success:true,
        message:"email send sucessfully...please cheack email"
    })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"something went wrong while creating reset password token"
        })
    }
}

//resetPassword

exports.resetPassword=async(req,res)=>{
    try {
        //data fetch
        const {password, confirmPassword,token}=req.body;
        //validation
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"please check the confirm password"
            })
        }
        //get userdetails from db using token
        const userDetails=await User.findOne({token:token});
        console.log(userDetails);

        //if no entry -invalid token
        if(!userDetails){
            return  res.status(402).json({
                success:false,
                message:"Token is invalid"
            })
        }
        //token time check
        if(userDetails.restPasswordExpires < Date.now()){
            return  res.status(402).json({
                success:false,
                message:"Token is expired.."
            })
        }
        //hash password
        const hashedPassword= await bcrypt.hash(password,10);
        //update password
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

        return res.status(200).json({
            success:true,
            message:"password is reset successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"something went wrong while rest password"
        })
    }
}