import User from "../models/user.model.js";

export const getUserForSidebar = async (req, res) => {
	try {
		const loginUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select("-password");

		const usersWithProfilePics = filteredUsers.map(user => {
			const gender = user.gender?.toLowerCase() === "female" ? "girl" : "boy";
			const username = user.username.toLowerCase();

			return {
				...user._doc,
				profilePic: `https://avatar-placeholder.iran.liara.run/public/${gender}?username=${username}`
			};
		});

		res.status(200).json(usersWithProfilePics);
	} catch (error) {
		console.error("getUserForSidebar error:", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};



// import User from "../models/user.model.js";

// export const getUserForSidebar = async (req, res) => {
//     try {
//         const loginUsersId = req.user._id; // Assuming req.user is set by the protectRoute middleware
//         const filteredUsers= await User.find({ _id: { $ne: loginUsersId } }).select("-password"); // Exclude the logged-in user
//         res.status(200).json(filteredUsers);

        
//     } catch (error) {
//         console.error("Error in getUserForSidebar:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
        
//     }
// }

// export const getUserForSidebar = async (req, res) => {
// 	try {
// 		const loginUsersId = req.user._id;

// 		const filteredUsers = await User.find({ _id: { $ne: loginUsersId } }).select("-password");

// 		const usersWithProfilePics = filteredUsers.map((user) => {
// 			const gender = user.gender?.toLowerCase() === "girl" ? "girl" : "boy";

// 			// clean and lowercase the full name for username
// 			const username = user.fullName?.toLowerCase().replace(/\s+/g, '') || "user";

// 			return {
// 				...user._doc,
// 				profilePic: `https://avatar-placeholder.iran.liara.run/public/${gender}?username=${username}`
// 			};
// 		});

// 		res.status(200).json(usersWithProfilePics);
// 	} catch (error) {
// 		console.error("Error in getUserForSidebar:", error.message);
// 		res.status(500).json({ error: "Internal Server Error" });
// 	}
// };
