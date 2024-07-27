const dotenv=require("dotenv");
const mongoose=require("mongoose")
dotenv.config();

MONGOURL = process.env.MONGOURL;

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("mongodb connected");
    }catch(error){
        console.log("error connecting to mongodb");
    }
};

module.exports = connectDB;