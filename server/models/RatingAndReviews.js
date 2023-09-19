const mongoose=require("mongoose");

const ratingAndReviews=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
    }
});
module.exports=mongoose.model("RatingAndReview",ratingAndReviews)