import cloudinary from '../config/connectCloudinary.config.js';
import { generateTokenAndSetCookie } from '../lib/generateTokenAndSetCookie.js';
import User from '../models/user.model.js';
import { schema, updateSchema } from '../utils/validationSchema.js';
import bcrypt from 'bcryptjs';

export const signup = async(req, res) => {
    const { fullname, email, password, confirmPassword, profilePicture } = req.body;
    try {
        if(!fullname || !email || !password || !confirmPassword) return res.status(400).json({ error: "All fields are required" });
        const { error } = schema.validate(req.body);
        if(error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const userExist = await User.findOne({ email });
        if(userExist) return res.status(400).json({ error: "email already exist" });
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({
            fullname,
            email,
            password: hashPassword,
            profilePicture
        });
        await user.save();
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({ message: "User created successfully", user: {
            ...user._doc,
            password: null
        } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in server" });        
    }
};
export const login = async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ error: "All fields are required" });
    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({ error: 'Email or password is incorrect' });
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(200).json({ message: "Login successfully", user: {
            ...user._doc,
            password: null
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in server" });        
    }
};
export const logout = async(req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong in server" });
    }
};
export const updateUserProfile = async(req, res) => {
    let { fullname, email, currentPassword, newPassword, profilePicture } = req.body;
    try {
        let user = await User.findById(req.user._id);
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if((!currentPassword && newPassword) || (currentPassword && !newPassword)) {
            return res.status(404).json({ error: 'please provide current password and new password' });
        }
        const { error } = updateSchema.validate(req.body);
        if(error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        if(currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password)
            if(!isMatch) {
                return res.status(404).json({ error: 'current password is incorrect' });
            }
            user.password = await bcrypt.hash(newPassword, 10);
        }
        if(profilePicture) {
            if(user.profilePicture) {
                await cloudinary.uploader.destroy(user.profilePicture.split('/').pop().split('.')[0]);
            }
            const uploadResponse = await cloudinary.uploader.upload(profilePicture);
            profilePicture = uploadResponse.secure_url;
        }
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();
        res.status(201).json({ message: "User updated successfully", user: {
            ...user._doc,
            password: null
        }});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in server" });
    }
};
export const checkAuth = async(req, res) => {
    try {
        console.log(req.user._id);
        const user = await User.findById(req.user._id);
        if(!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ user: {
            ...user._doc,
            password: null,
        }});
    }catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong in server" });
    }
};