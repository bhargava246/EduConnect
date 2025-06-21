import bcrypt from "bcryptjs";
import userModel from "../models/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const login = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)return res.status(400).json({error: 'All fields are mandatory'});
    try {
        const user = await userModel.findOne({email: email});
        if(!user){return res.status(401).json({error: 'user does not exist' })}
        const valid = await bcrypt.compare(password,user.password)
        const accessSecret = process.env.accessSecret
        const refreshSecret = process.env.refreshSecret
        if(valid){
            
            const accessToken =  jwt.sign(
                {id: user._id,email,role:user.role},
                accessSecret,
                {
                    expiresIn: "2h"
                }
            );

            const refreshToken = jwt.sign(
                {id: user._id,email},
                refreshSecret,
                {
                    expiresIn: "5h"
                }
            )
            user.refreshToken = refreshToken;
            await user.save();
            const userResponse = {
                id: user._id,
                name: user.name,
                email: user.email, 
                role: user.role,
               };
            const option = {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"

            };
            res.cookie("refreshToken",refreshToken,option);
            res.status(200).cookie("accessToken",accessToken,option).redirect('/dashboard');
            }
        else{
            res.status(401).json({error: "Incorrect Password"});
    }} catch (error) {
       return res.status(500).json({error: 'internal error'})
    }
}

const refresh = async (req,res)=>{
    const tokenFromCookie = req.cookies?.refreshToken;
    const refreshSecret = process.env.refreshSecret;
    const accessSecret = process.env.accessSecret;

    if(!tokenFromCookie){
        return res.status(401).json({error: 'Refresh token missing'});
    }
    let refreshToken 
    let decoded
    try {decoded= jwt.verify(tokenFromCookie,refreshSecret);}
    catch(error){
        return res.status(403).json({error: 'Invalid or exprired token'})
    }
    const user = await userModel.findOne({_id:decoded.id})
    if(!user){return res.status(500).send({error: 'user not found'})};
    if(user.refreshToken === tokenFromCookie){
        const newaccessToken =  jwt.sign(
            {id: user._id,email:user.email},
            accessSecret,
            {
                expiresIn: "2h"
            }
        );
        const newrefreshToken = jwt.sign(
            {id: user._id,email:user.email},
            refreshSecret,
            {
                expiresIn: "5h"
            }
        )
        const option = {
            expires: new Date(Date.now()+3*24*60*60*1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"

        };
        user.refreshToken = newrefreshToken;
        await user.save();   
        res.cookie("refreshToken",newrefreshToken,option);
        res.cookie("accessToken",newaccessToken,option);
        res.status(200).send({message: 'generated successfully'})
    }

}
export {login,refresh}; 
