//server entry point 
import app from "./app.js";

const PORT=5001;

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
})