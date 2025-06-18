import express from "express";
import userRegister from "../controllers/userRegister.js";
import userLogin from "../controllers/userLogin.js";


const router = express.Router();

router.post('/register',userRegister);
router.post('/login',userLogin);
export default router;