import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Connected successfully")
        )
        await mongoose.connect(`${process.env.MONGO_URI}/Ecommerce`)
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDB;