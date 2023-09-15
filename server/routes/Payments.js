const express=require("express");
const router=express.Router();

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/Payments");
const { Auth, isStudent} = require("../middleware/authMiddleware");
router.post("/capturePayment", Auth, isStudent, capturePayment)
router.post("/verifyPayment",Auth, isStudent,verifyPayment)
router.post("/sendPaymentSuccessEmail", Auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;