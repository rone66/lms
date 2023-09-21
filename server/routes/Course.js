const express = require("express");
const router = express.Router();


const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
} = require("../controllers/Course");


const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category");


const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");



const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection");



const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview");


const {updateCourseProgress} = require("../controllers/courseProgress");

const { Auth, isInstructor, isStudent, isAdmin } = require("../middleware/authMiddleware");


//course created by instuctor
router.post("/createCourse", Auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", Auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", Auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", Auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", Auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", Auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", Auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", Auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", Auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", Auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

router.post("/updateCourseProgress", Auth, isStudent, updateCourseProgress);



//routes only for admin
router.post("/createCategory", Auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)



router.post("/createRating", Auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router;