import bcrypt from "bcryptjs";
import userModel from "../models/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userLogin = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)return res.status(400).json({error: 'All fields are mandatory'});
    try {
        const user = await userModel.findOne({email: email});
        if(!user){return res.status(401).json({error: 'user does not exist' })}
        const valid = await bcrypt.compare(password,user.password)
        const secret = process.env.SECRET
        if(valid){
            
            const token =  jwt.sign(
                {id: user._id,email},
                secret,
                {
                    expiresIn: "2h"
                }
            );
            const userResponse = {
                id: user._id,
                name: user.name,
                email: user.email, 
                role: user.role,
                token
               };
            const option = {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly: true
            };
            res.status(200).cookie("token",token,option).json({
                success: true,
                token,
                userResponse
            })
            }
        else{
            res.status(200).json({message: "Incorrect Password"});
    }} catch (error) {
       return res.status(500).json({error: 'internal error'})
    }
}
export default userLogin;
