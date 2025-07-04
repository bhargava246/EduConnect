import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cookieParser())

app.use('/api',authRoutes);

export default app;