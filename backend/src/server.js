import connectDB from "./config/db.js";
import express from "express";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server IS listening at ${PORT} port`);
})

 
 