import { course } from "../models/user.js";

const createCourse = async (req,res)=>{
    try {
        const {name,startDate,endDate,createdBy,price,category} = req.body
    if(!name||!price||!category){
        return res.status(400).send('Info is missing');
    }
    const isExist = await courseModel.findOne({name:name})
    if(isExist){ return res.status(409).send('Course already exists');}
    const newcourseModel = new courseModel({name,startDate,endDate,createdBy,price,category});
    await newcourseModel.save();
    return res.status(200).json({message: 'course created successfully ',
       course: newcourseModel}
    );


    } catch (error) {
        console.error(error);        
        return res.status(500).send('Internal Error');
    } ;

};
const fetchCourses = async (req,res)=>{
try {
    const courses = await courseModel.find({})
    return res.status(200).send(courses);
} catch (error) {
    return res.status(500).send('Internal Error');
};
};

const courseById = async (req,res)=>{
    
    try {
        const {name} = req.body;
        let user = await courseModel.findOne({name:name})
        if(!user){ return res.status(404).send('Course does not exist');}
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        
        return res.status(500).send('Internal Error');
    }
}
const updateCourses = async (req,res)=>{
    try {
        const {name,startDate,endDate,createdBy,price,category} = req.body

        let newCourse = await new courseModel.findByIdAndUpdate(
            req.url.id,
            {name,startDate,endDate,createdBy,price,category},
            {new:true}
        );
        if(!newCourse){ return res.status(404).send('Course does not exist, if req create a new course');}
        return res.status(200).json({message: 'course has been updated'},{data: newCourse});
    } catch (error) {
        console.error(error);
        return res.status(500).send('internal server error');
        
    }
}
const deleteCourses = async (req,res)=>{
    try {
        let deleteCourse = findByIdAndDelete(req.url.id);
        if(!newCourse){ return res.status(404).send('Course does not exist');}
        return res.status(200).json({message: 'course has been deleted'});
    } catch (error) {
        console.error(error);
        return res.status(500).send('internal server error');
    }
}
export {courseById,fetchCourses,createCourse,updateCourses,deleteCourses}