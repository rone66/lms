const { default: mongoose } = require("mongoose");
const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User= require("../models/User");
const mailSender=require("../utils/mailSender");

//attach course enrollment email template
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail}=require("../mail/templates/paymentSuccessEmail");

//capture the payment and initiate the razorpay order
exports.capturePayment=async(req,res)=>{
    //get courseId and userId
    const {course_id} = req.body;
    const userId=req.user.id;

    //validation
    if(!course_id){
        return res.json({
            success:false,
            message:'please provide valid course id'
        })
    }

    //valid course Detail
    let courseDetail;
    try {
        courseDetail=await Course.findById(course_id);

        if(!courseDetail){
            return res.json({
                success:false,
                message:'could not find the course'
            })
        }
        //check the user already pay or not
        const uid=new mongoose.Types.ObjectId(userId);
        if(courseDetail.studentEnrolled.includes(uid)){
            return res.status(200).json({
                success:false,
                message:'student already approved'
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

    

    //order create 

    const amount=courseDetail.price;
    const Currency="INR";

    const option={
        amount:amount*100,
        Currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:course_id,
            userId,
        }
    };

    //create order
    try {
        //initiate the payment using razorpay
        const paymentResponse=await instance.orders.create(option);
        console.log(paymentResponse);

        return res.status(200).json({
            success:true,
            courseName:courseDetail.courseName,
            courseDescription:courseDetail.courseDescription,
            thumbnail:courseDetail.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.Currency,
            amount:paymentResponse.amount,

        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"could not initiate the order"
        })
    }
    //return response


}


//verify signature

exports.verifySignature=async(req,res)=>{
    const webhookSecret="12345678";

    const signature=req.headers["x-razorpay-signature"];

    const shasum=crypto.createHmac("sha256",webhookSecret);

    shasum.update(JSON.stringify(req.body));

    const digest=shasum.digest("hex");

    if(signature===digest){
        console.log("payment is authorized");

        const {courseId,userId}=req.body.payload.payment.entity.notes;

        try {
            //fulfill the action

            //find the course and enroll the student
            const enrollCourse= await Course.findByIdAndUpdate({_id:courseId},{$push:{studentEnrolled:userId}},{new:true});


            if(!enrollCourse){
                return res.status(400).json({
                    success:false,
                    message:"something problem in enroll course"
                })
            }
            console.log(enrollCourse);

            const enrollStudent=await User.findByIdAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});

            console.log(enrollStudent);

            //confirmation mail send

            const mailResponse=await mailSender(
                            enrollStudent.email,
                            "congratulations from lms",
                            "congratulations...you are successfully enrolled"

            );
            console.log(mailResponse);
            return res.status(200).json({
                success:true,
                message:'signature varified and course added'
            })


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
            
        }

    }else{
        return res.status(400).json({
            success:false,
            message:'invalid request',
        })
    }
}


exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
  
    const userId = req.user.id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
}



const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Course ID and User ID" })
    }
  
    for (const courseId of courses) {
      try {
        // Find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          { $push: { studentsEnroled: userId } },
          { new: true }
        )
  
        if (!enrolledCourse) {
          return res
            .status(500)
            .json({ success: false, error: "Course not found" })
        }
        console.log("Updated course: ", enrolledCourse)
  
        const courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId: userId,
          completedVideos: [],
        })
        // Find the student and add the course to their list of enrolled courses
        const enrolledStudent = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              courses: courseId,
              courseProgress: courseProgress._id,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", enrolledStudent)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ success: false, error: error.message })
      }
    }
}