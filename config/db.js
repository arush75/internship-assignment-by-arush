import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();
//i used env file because i was using an atlas server you can too use this or you can use an local mongo server

const connectDB = async () => {
    // const user = process.env.user;
    // const password = process.env.password;

    // const MONGOURL='your url here'; //url with the database name like mongodb://localhost:27017/your_db_name

    try {
        await mongoose.connect(MONGOURL);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

export default connectDB;
