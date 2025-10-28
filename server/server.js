import express from "express";
import 'dotenv/config';
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

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

app.get('/', (req, res) => res.send("Server Running"));
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

export default app;