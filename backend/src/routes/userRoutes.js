import express from "express";
import userRegister from "../controllers/userRegister.js";
import {login,refresh,logout} from "../controllers/userLogin.js";
import { adminAuth ,studentAuth,teacherAuth,bothAuth} from "../middlewares/authMiddleware.js";
import { courseById,fetchCourses,createCourse,updateCourses,deleteCourses } from "../controllers/createCourse.js"; 

const router = express.Router();

router.post('/auth/register',userRegister);
router.post('/auth/login',login);
router.get('/auth/refresh',refresh);
router.post('/courses/addCourses',createCourse);
router.get('/courses/fetchCourses',bothAuth,fetchCourses);
router.post('/courses/fetchById',courseById);
router.put('/courses/updateCourses/:id',updateCourses);
router.delete('/courses/deleteCourse',deleteCourses);
router.get('/logout',logout);


export default router;