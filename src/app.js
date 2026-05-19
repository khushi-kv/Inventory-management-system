import express from "express";
import cors from "cors";
import productRoutes from "./routes/products.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
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

app.use("/api/products",productRoutes)
app.use(errorHandler);
export default app;