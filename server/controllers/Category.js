const Category=require("../models/Category");

//create tag

exports.createCategory=async(req,res)=>{
    try {
        //fetch data
        const {name,description}=req.body;
        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"all fields are required",
            })
        }
        //create entry in db
        const categoryDetail= await Category.create({
            name:name,
            description:description,
        })

        console.log(categoryDetail);

        return res.status(200).json({
            success:true,
            message:"category created successfully"
        })

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};



//getAllTags

exports.showAllCategories=async(req,res)=>{
    try {
        const allCategory= await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"all tags returned successfully",
            data:allCategory
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}


//category detail page

exports.categoryPageDetails= async (req,res)=>{

    try{
        //get category id
        const {categoryId}=req.body;

        //get course for specifed category id
        const selectCategory=await Category.findById(categoryId).populate("courses").exec();
        
        //validation
        if(!selectCategory){
            return res.status(404).json({
                success:false,
                message:'data not found'
            })
        }

        //get courses differnt categories
        const differentCategories=await Category.find({
                                                    _id:{$ne: categoryId},
                                                    }).populate("courses").exec();


        //todo:get top selling courses
        const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
        const allCourses = allCategories.flatMap((category) => category.courses)
        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        return res.status(200).json({
            success:true,
            data:{
                selectCategory,
                differentCategories,
                mostSellingCourses
            },
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }

}