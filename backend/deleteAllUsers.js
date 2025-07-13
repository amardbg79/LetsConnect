import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config({ path: '../.env' }); // Correct path to your .env file

console.log("MONGO URI:", process.env.MONGO_DB_URI); // Debug log

const deleteAllUsers = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const result = await User.deleteMany({});
		console.log(`✅ Deleted ${result.deletedCount} users.`);
		process.exit(0);
	} catch (error) {
		console.error("❌ Error deleting users:", error.message);
		process.exit(1);
	}
};

deleteAllUsers();
