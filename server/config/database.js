const mongoose=require("mongoose");
require("dotenv").config();

exports.connectDb=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then((conn)=>{console.log("Db connection successfully",conn.connection.host);})
    .catch((error)=>{
        console.log("Db connection failed");
        console.error(error);
        process.exit(1);
        
    })
}