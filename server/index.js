const express=require("express");
const app=express();
const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");
const contactUs=require("./routes/Contact");
const database= require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnection}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");
require("dotenv").config();


const PORT=process.env.PORT || 4000;

database.connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:'/tmp',
    })
)

cloudinaryConnection();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1",contactUs);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        messaage:'your server is up and running....'
    });
})


app.listen(PORT,()=>{
    console.log(`app is runing at ${PORT}`);
})
