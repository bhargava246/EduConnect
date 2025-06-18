import userModel from "../models/user.js";
import mongoose from "mongoose";

const userLogin = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email: email});
        if(password == user.password){
            res.status(200).json("User Verified Successfully")
            }
        else{
            res.status(200).json({message: "Incorrect Password"});
    }} catch (error) {
        res.status(500).json({err: 'user not found'})
    }
}
export default userLogin;
