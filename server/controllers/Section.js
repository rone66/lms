const Section=require("../models/Section");
const Course=require("../models/Course");
const SubSection=require("../models/SubSection");


exports.createSection=async(req,res)=>{
    try {
     //data fetch
     const {sectionName,courseId}=req.body;
     //data validation
     if(!sectionName || !courseId){
        return res.status(400).json({
          success:false,
          message:"missing properties"  
        })
     }
     //create section
     const newSection= await Section.create({sectionName})
     //update course with section objectId
     const updatedCourseDetails= await Course.findByIdAndUpdate(
        courseId,{
            $push:{
                courseContent:newSection._id,
            }
        },{new:true}
     ).populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        },
    })
    .exec();
     //use populate to replace section/sub section both in updatedCourse
     //return res

     return res.status(200).json({
        success:true,
        message:'section created successfully',
        updatedCourseDetails,

     })

    }catch(error) {
        return res.status(500).json({
            success:false,
            message:"unable to create section .....try again",
            error:error.message,
        })
        
    }
}


exports.updateSection=async(req,res)=>{
    try {
        //data input
        const{sectionName,sectionId,courseId}=req.body;
        
        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
              success:false,
              message:"missing properties"  
            })
         }
        //update
        const updatSection=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //return res
        return res.status(200).json({
            success:true,
            message:updatSection,
            data:course

        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to update section .....try again",
            error:error.message,
        })
    }
}

exports.deleteSection=async(req,res)=>{
    try {
        // fetch id from params
        const {sectionId,courseId}= req.body;

        //todo:do we need to delete the entry from course
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        //delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

        //findbyidAndDelete
        await Section.findByIdAndDelete(sectionId);

        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        return res.status(200).json({
            success:true,
            message:'section deleted successfully',
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"unable to delete section .....try again",
            error:error.message,
        })
        
    }
}
