import pkg from "colors";
import mongoose from "mongoose";
const {hidden} = pkg
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "Student"
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
    }
   
    
});


const userModel = mongoose.model('userModel',userSchema);
console.log('Collection name:', userModel.collection.name);
export default userModel;
