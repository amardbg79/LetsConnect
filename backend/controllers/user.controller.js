import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loginUsersId = req.user._id; // Assuming req.user is set by the protectRoute middleware
        const filteredUsers= await User.find({ _id: { $ne: loginUsersId } }).select("-password"); // Exclude the logged-in user
        res.status(200).json(filteredUsers);

        
    } catch (error) {
        console.error("Error in getUserForSidebar:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}