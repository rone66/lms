const RatingAndReview=require("../models/RatingAndReviews");
const Course=require("../models/Course");
const { default: mongoose } = require("mongoose");


//create rating

exports.createRating=async(req,res)=>{
    try {
        //get user id
        const userId=req.user.id;

        //fetch data from req body
        const {rating,review,courseId}=req.body;
        console.log(rating,review,courseId);

        //check user is enrolled or not
        const courseDetails=await Course.findOne({_id:courseId,
                                        studentsEnrolled:{$elemMatch: {$eq: userId} },

                                    });
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'student is not enrolled in the course'
            })
        }
        //check if user already reviewed the course
        const alreadyReviewed= await RatingAndReview.findOne({
                                           user:userId,
                                           course:courseId,                                         
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:'student is already reviewed the course'
            })
        }
        //create rating
        const ratingReview= await RatingAndReview.create({
                                                        rating,review,
                                                        course:courseId,
                                                        user:userId

        });
        //update course with this rating/review
        const updatedCourseDetails=await Course.findByIdAndUpdate({_id:courseId},{
                                        $push:{
                                            ratingAndReviews:ratingReview._id,
                                        }
                                        },{new:true})

        //return res
        console.log(updatedCourseDetails);
        return res.status(200).json({
            success:true,
            message:'Rating and review created successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}


//average rating

exports.getAverageRating=async(req,res)=>{
    try {
     //get course id
     const courseId=req.body.courseId;

     //calculate avg rating   
     const result= await RatingAndReview.aggregate([
        {
            $match:{
                course:new mongoose.Types.ObjectId(courseId),
            },
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:"$rating"},
            }
        }
     ])

     //return res
     if(result.length>0){
        return res.status(200).json({
            success:true,
            averageRating: result[0].averageRating,
        })
     }
     //if rating exist
     return res.status(200).json({
        success:true,
        message:"average rating is zero", 
        averageRating:0,
     });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
           
        })
    }
}




//get all rating and reviews

exports.getAllRating=async(req,res)=>{
    try {
        //fetch all reviews

        const allReviews=await RatingAndReview.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName email image",
                                            })
                                            .populate({
                                                path:"course",
                                                select:"courseName",
                                            }).exec();
        
        return res.status(200).json({
            success:true,
            message:"all reviews are fetched successfully", 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
           
        })
    }
}