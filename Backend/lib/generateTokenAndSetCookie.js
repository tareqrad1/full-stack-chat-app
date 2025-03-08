import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = async(id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    });
    return token;
};