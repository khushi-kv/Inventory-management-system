import express from "express";
import cors from "cors";

const app=express();

//middlewares
app.use(cors());
app.use(express.json());


//test route backend health check
app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"Backend is running"
    });
});

export default app;