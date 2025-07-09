import express from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser'; // ✅ required for JWT cookies

import authRoutes from './routes/auth.routes.js'; 
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';


import connectToMongoDB from './db/connectToMongoDB.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser()); // parses cookies from req.cookies

// app.get("/test-cookie", (req, res) => {
//   console.log("Cookies:", req.cookies);
//   res.send("Check your terminal for cookies!");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

 // to parse are incoming JSON requests (from req.body)
app.get('/', (req, res) => {
  //route Route //location: http://localhost:5000/
    res.send('HELLO BhaiLog');
});



app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  connectToMongoDB();
});
