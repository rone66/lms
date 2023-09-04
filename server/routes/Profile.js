const express=require("express");
const router= express.Router();
const { Auth, isInstructor } = require("../middleware/authMiddleware");

const {updateProfile,deleteAccount,getAllUserDetails,getEnrolledCourses,updateDisplayPicture,instructorDashboard}=require("../controllers/Profile")


router.delete("/deleteProfile", Auth, deleteAccount);
router.put("/updateProfile", Auth, updateProfile);
router.get("/getUserDetails", Auth, getAllUserDetails);


router.get("/getEnrolledCourses", Auth, getEnrolledCourses);
router.put("/updateDisplayPicture", Auth, updateDisplayPicture);
router.get("/instructorDashboard", Auth, isInstructor, instructorDashboard);


module.exports = router