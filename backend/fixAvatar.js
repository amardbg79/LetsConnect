import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
});

const fixAvatars = async () => {
  try {
    const users = await User.find();

    for (let user of users) {
      const username = user.username.toLowerCase();
      const gender = user.gender === "male" ? "boy" : "girl";

      const correctAvatar = `https://avatar-placeholder.iran.liara.run/public/${gender}?username=${username}`;

      if (!user.profilePic.includes("avatar-placeholder")) {
        user.profilePic = correctAvatar;
        await user.save();
        console.log(`✅ Updated avatar for: ${user.username}`);
      } else {
        console.log(`✔ Already correct: ${user.username}`);
      }
    }

    console.log("🎉 Avatar update complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to update avatars:", error.message);
    process.exit(1);
  }
};

fixAvatars();
