const User = require("../models/User");
const Profile=require("../models/Profile");
const Otp = require("../models/OTP");
const otpgenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const mailSender=require("../utils/mailSender");
const jwt=require("jsonwebtoken");
const {passwordUpdated}=require("../mail/templates/passwordUpdate");
require("dotenv").config();




//sendOtp
exports.sendOtp=async(req,res)=>{
    try {

    const {email}=req.body;
    const checkedUser=await User.findOne({email});
    if(checkedUser){
        return res.status(401).json({
            success:false,
            message:'user already registered',
        })
    }

    //genrate otp

    let otp=otpgenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("otp generated-->",otp);

    //check unique otp or not
       let result= await Otp.findOne({otp:otp});

       while(result){
            otp=otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result= await Otp.findOne({otp:otp});
        }
        const otpPayload={email,otp};
        const otpBody =await Otp.create(otpPayload);

        console.log("otpbody-->",otpBody);
        //return response successful

        res.status(200).json({
            success:true,
            message:'otp sent successfully',
            otp,
        })


    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

};

//signup

exports.signUp= async(req,res)=>{
    try {
    //data fetching
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
            }=req.body;
    //validate
        if(!firstName || !lastName|| !email|| !password|| !confirmPassword||!otp){
            return res.status(403).json({
                sucess:false,
                message:"All fields are required"
            })
        }
    //password matching

        if(password!==confirmPassword){
            return res.status(400).json({
                sucess:false,
                message:"password and confirm password not matched"
            })
        }

    //check user already exist or not

       const existedUser=await User.findOne({email});
       if(existedUser){
        return res.status(404).json({
            success:false,
            message:"user already exist"
        })
       } 

    //find most recent otp stored for the user
       const recentOtp = await Otp.find( {email} ).sort({ createdAt: -1 }).limit(1)
       console.log("recent otp-->",recentOtp);

    //validate otp
       if (recentOtp.length===0) {
        return res.status(400).json({
            success:false,
            message:"otp not found"
        })
       }
       else if(otp !== recentOtp[0].otp){
        return res.status(400).json({
            success:false,
            message:"otp not matched"
        })
       }
    

    //hash password

       const hashedPassword= await bcrypt.hash(password,10);

    //entry on db
       
       const profileDetail= await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
       });

        const user= await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetail._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
    
    //return res
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"user cannot be registered"
        })
    }

}



//login
exports.login = async(req, res) => {
    try {
      // Get email and password from request body
      const { email, password } = req.body
  
      // Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: `Please Fill up All the Required Fields`,
        })
      }
  
      // Find user with provided email
      const user =await User.findOne({ email }).populate("additionalDetails");
      //console.log(user);
  
      // If user not found with provided email
      if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: `User is not Registered with Us Please SignUp to Continue`,
        })
      }
      //console.log(user.password);
      // Generate JWT token and Compare Password
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { email: user.email, id: user._id, accountType: user.accountType },
          process.env.SECRET,
          {
            expiresIn: "24h",
          }
        )
  
        // Save token to user document in database
        user.token = token
        user.password = undefined
        // Set cookie for token and return success response
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        }
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: 'User Login Success',
        })
      } else{
            return res.status(401).json({
            success: false,
            message: 'Password is incorrect',
            })
        }
      
    } catch (error) {
      console.error(error)
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: `Login Failure Please Try Again`,
      })
    }
  }



//changePassword
exports.changePassword=async(req,res)=>{
    try {
        //data from req body
        const {oldPassword,newPassword,confirmNewPassword}=req.body;
        const userId=req.user.id;

        //matching new and confirm password
        if(newPassword!==confirmNewPassword){
            return res.json({
                success:false,
                message:'new password and confirm password not matched'
            })
        }
        const userDetail= User.findById(userId);

        //matching old password to database saved password

        const isMatch= await bcrypt.compare(oldPassword,userDetail.password);

        if(!isMatch){
            return res.json({
                success:false,
                message:'present password  is not matched'
            })
        }
        //update pwd in db

        const hashedPassword=bcrypt.hash(newPassword,10);
        const updatedUserDetails= User.findByIdAndUpdate(userId,{password:hashedPassword},{new:true});

        //send mail
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                  updatedUserDetails.email,
                  `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
              )
              console.log("Email sent successfully:", emailResponse.response)
            
        } catch (error) {
            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
              success: false,
              message: "Error occurred while sending email",
              error: error.message,
            })
            
        }
        return res.status(200).json({
            success: true, 
            message: "Password updated successfully",
        })

    } catch (error) {
        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
        
    }
}