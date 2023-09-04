const Profile=require("../models/Profile");
const User=require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course");
require("dotenv").config();


exports.updateProfile=async(req,res)=>{
    try {
        //get data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;

        //get userId
        const id=req.user.id;
       

        //validation
        if(!id ||!contactNumber||!gender){
            return res.status(400).json({
                success:false,
                message:"any of the field missing"
            })
        }

        //find profile
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);
        //console.log(profileDetails);

        //update profile

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;
        profileDetails.gender=gender;

        //console.log(dateOfBirth);

        await profileDetails.save();
        //return res
        return res.status(200).json({
            success:true,
            message:'profile updated successfully',
            profileDetails,
        })
    } catch(error) {
      console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}



exports.deleteAccount =async(req,res)=>{
    try {
        //get id
        const id=req.user.id;
        //console.log("user id is-->",id);
        //validation
        const userDetail=await User.findById({_id:id});
        console.log(userDetail);
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"not found any user details",
            })
        }
        //delete profile
        await Profile.findByIdAndDelete({_id:userDetail.additionalDetails});
        
        //todo:unenroll user from all enrolled courses

        for (const courseId of userDetail.courses) {
          await Course.findByIdAndUpdate(
            courseId,
            { $pull: { studentsEnroled: id } },
            { new: true }
          )
        }

        //delete user
        const profileDetails=await User.findByIdAndDelete({_id:id});

        //return res
        return res.status(200).json({
            success:true,
            message:'user deleted successfully',
            profileDetails,
        })

    } catch (error) {
      console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.getAllUserDetails=async(req,res)=>{
    try {
        //get id
        const id=req.user.id;
        //validation and  get user detail
        const userDetail=await User.findById(id).populate("additionalDetails").exec();
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:"not found any user details",
            })
        }

        return res.status(200).json({
            success:true,
            message:'user data fetched successfully',
            userDetail,
        })
        
    } catch (error) {
        
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }


exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}


exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnroled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
  }
  