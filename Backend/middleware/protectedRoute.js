import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectedRoute = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ error: 'Unauthorized: No token provided' });
        }        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        const user = await User.findById(decoded.id);
        if(!user) {
            return res.status(401).json({ error: 'User Not Found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};