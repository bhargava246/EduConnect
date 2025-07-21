import bcrypt from "bcryptjs"
import { response } from "express";

const enrollemnt = async ()=>{

    try {
        let decoded = await jwt.verify("accessToken",'accessSecret');
    } catch (error) {
        return res.status(400).send('access token can not be verified');
    }
    if(decoded.role != 'student'){
        return res.status(400).send('requesting user is not a student');
    }
    let {courseName} = req.body();
    let isExist = courseModel.findOne({name:name});
    

}