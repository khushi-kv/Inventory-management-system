// server entry point
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";



// ✅ connect to MongoDB first
connectDB();

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});