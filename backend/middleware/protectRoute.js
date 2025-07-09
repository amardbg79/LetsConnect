import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Assuming the User model is in this path
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Assuming the JWT is stored in a cookie named 'jwt'
        if(!token) {
            return res.status(401).json({ error: "Unauthorized access, token missing" });
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded || !decoded.userId) {
            return res.status(401).json({ error: "Unauthorized access, invalid token" });
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user=user; // Attach user to the request object
        next(); // Call the next middleware or route handler


        
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}
export default protectRoute;
