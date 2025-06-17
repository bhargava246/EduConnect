import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async ()=>{
    try{
      await mongoose.connect(process.env.Mongo_URI) } 
    catch(err){console.error(err); 
        process.exit(1);
    }
    console.log(`MongoDB Connected successfullt with url ${process.env.Mongo_URI}`);
}
 
export default connectDB;