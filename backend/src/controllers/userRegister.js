import mongoose from "mongoose";
import userModel from "../models/user.js";


const userRegister = async (req,res)=>{
    const {name,role,email,password} = req.body;
    if(!name || !role || !email ||!password){
        return res.status(400).send("Information is missing");
    }
    try {
        const newuserModel = new userModel({name,role,email,password});
        await newuserModel.save();
        res.status(201).json(newuserModel)
    } 
      catch (error) {
    console.error(error);
    res.status(500).json({error: 'failed to store data'});
    }
}
export default userRegister;