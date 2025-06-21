import jwt from "jsonwebtoken";
const adminAuth = async (req,res,next)=>{
    const accessToken = req.cookies?.accessToken
    const accessSecret = process.env.accessSecret;
    let decoded;
    try {
        decoded = jwt.verify(accessToken,accessSecret);
    } catch (error) {
        return res.status(401).send('access token not valid');
    }
    if(decoded.role == "admin"){
        req.user = decoded;
        return next()
    }else{return res.status(500).send('not verified');}

} 
const studentAuth = async (req,res,next)=>{
    const accessToken = req.cookies?.accessToken
    const accessSecret = process.env.accessSecret;
    let decoded;
    try {
        decoded = jwt.verify(accessToken,accessSecret);
    } catch (error) {
        return res.staus(401).send('access token not valid');
    }
    if(decoded.role == "student"){
        req.user = decoded;
        return next()
    }else{return res.staus(200).send('not verified');}

} 
const teacherAuth = async (req,res,next)=>{
    const accessToken = req.cookies?.accessToken
    const accessSecret = process.env.accessSecret;
    let decoded;
    try {
        decoded = jwt.verify(accessToken,accessSecret);
    } catch (error) {
        return res.staus(401).send('access token not valid');
    }
    if(decoded.role == "teacher"){
        req.user = decoded;
        return next()
    }else{return res.staus(200).send('not verified');}

} 
export {adminAuth,studentAuth,teacherAuth}