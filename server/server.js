import express from "express";
import 'dotenv/config';
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express()
const port  = process.env.PORT || 4000;

await connectDB();
await connectCloudinary()

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => res.send("API IS WORKING"));
app.use('/api/user', userRouter)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

export default app;