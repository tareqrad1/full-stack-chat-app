import express from 'express';
import authRoute from './routers/auth.router.js';
import dotenv from 'dotenv';
import { connectDb } from './config/connectDb.config.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routers/message.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
    connectDb()
});
