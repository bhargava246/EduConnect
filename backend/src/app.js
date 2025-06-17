import express from "express";
import dotenv from "dotenv";
import courses from "./routes/courses.js";
import login from "./routes/login.js";
import register from "./routes/register.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
 
const app = express();
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/courses',courses)

export default app;