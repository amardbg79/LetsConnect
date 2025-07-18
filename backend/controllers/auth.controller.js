import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie  from "../utils/generateTokens.js";
export const signup = async (req, res) => {
   try {
    
    const {fullName,username,password,confirmPassword,gender} = req.body;
    console.log("Received Body:", req.body);


    if(password !== confirmPassword) {
        return res.status(400).json({error: "Passwords do not match"});
    }
    const user=await User.findOne({username});
    if(user) {
        return res.status(400).json({error: "User already exists"});
    }

    //Hash Password here
    //https://avtar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar-placeholder.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar-placeholder.iran.liara.run/public/girl?username=${username}`;


    //const hashedPassword = await bcrypt.hash(password, 10);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    const newUser = new User({
        fullName,
        username,
        password:hashedPassword, // Make sure to hash this password before saving
        gender,
        profilePic: gender==="male" ? boyProfilePic : girlProfilePic
    });

    if(newUser){
        //Generate JWT token here
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,  
            profilePic:newUser.profilePic,  
        });
    }
    else {
        res.status(400).json({error: "Invalid User Data"});
    }

   } catch (error) {
    console.error("Error in signup:", error.message)
    res.status(500).json({error: "Internal Server Error"})
   }
};

export const login = async (req, res) => {
    try {
        const {username, password} =req.body;

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);
        
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        });

        
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
        
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Logged out successfully"});
        
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
        
    }
} 