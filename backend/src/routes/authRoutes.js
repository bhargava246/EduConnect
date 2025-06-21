import express from "express";
import userRegister from "../controllers/userRegister.js";
import {login} from "../controllers/userLogin.js";
import dashboard from "../controllers/dashboard.js";
import { refresh } from "../controllers/userLogin.js";
import { adminAuth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/register',userRegister);
router.post('/login',login);
router.get('/refresh',refresh);
router.get('/dashboard',adminAuth,dashboard)
export default router;