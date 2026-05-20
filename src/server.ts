// Entry point — connects DB and starts the HTTP server
import dotenv from "dotenv";
dotenv.config();              

import app from "./app.js";  
import { connectDB } from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
