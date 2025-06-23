import mongoose from "mongoose";
import {user} from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRegister = async (req,res)=>{
    const {name,role,email,password} = req.body;
    if(!name || !role || !email ||!password){
        return res.status(400).send("Information is missing");
    }

   const existUser =  await userModel.findOne({email})
    if(existUser){
       return res.status(401).json({error: 'User exist already'})
    }

    const myEncPassword = await bcrypt.hash(password,10)
    try {
        const newuserModel = new user({name,role,email,password:myEncPassword});
        await newuserModel.save();
        const secret = process.env.SECRET
        if(!secret){return res.status(500).json({error: 'Secret key is missing in env'})}
       const token =  jwt.sign(
            {id: newuserModel._id,email},
            secret,
            {
                expiresIn: "2h"
            }
        );
       const userResponse = {
        id: newuserModel._id,
        name: newuserModel.name,
        email: newuserModel.email, 
        role: newuserModel.role,
        token
       };
       return res.status(201).json(userResponse)
    } 

   
      catch (error) {
    console.error(error);
    res.status(500).json({error: 'failed to store data'});
    }
}
export default userRegister;