import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

export const protectMiddleware = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized" });
    }
};
