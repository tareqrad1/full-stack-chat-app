import express from 'express';
import authRoute from './routers/auth.router.js';
import dotenv from 'dotenv';
import { connectDb } from './config/connectDb.config.js';
import cookieParser from 'cookie-parser';
import messageRoute from './routers/message.route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { server, app } from './lib/socket.io.js'
dotenv.config();

const PORT = process.env.PORT;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

//routes
app.use('/api/auth', authRoute);
app.use('/api/message', messageRoute);

server.listen(PORT, () => {
    console.log('Server is running on port', PORT);
    connectDb()
});
