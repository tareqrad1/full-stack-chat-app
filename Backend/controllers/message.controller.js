import User from "../models/user.model.js";
import Message from '../models/message.model.js';
import cloudinary from "../config/connectCloudinary.config.js";
import { getReceiverSocketId, io } from "../lib/socket.io.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const myId = req.user._id;
        const filterUser = await User.find({_id: { $ne: myId }}).select('-password');
        res.status(200).json({ users: filterUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const getMessages = async(req, res) => {
    const { id }= req.params;
    const myId = req.user._id;
    try {
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: id },
                { senderId: id, receiverId: myId }
            ]
        });
        res.status(200).json({ messages });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
export const addMessage = async(req, res) => {
    const { id } = req.params;
    const myId = req.user._id;
    let { text, image } = req.body;
    try {
        if(image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            image = uploadResponse.secure_url;
        };
        if(!text && !image) {
            return res.status(400).json({ error: 'Please provide text or image' });
        }
        const newMessage = new Message({
            senderId: myId,
            receiverId: id,
            text,
            image
        });
        await newMessage.save();
        // start socket io
        const receiverSocketId = getReceiverSocketId(id);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(200).json({ newMessage });
    } catch (error) {
        console.log(error.message);
        
        res.status(500).json({ error: 'Internal server error' });
    }
};