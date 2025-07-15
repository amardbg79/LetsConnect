// import express from 'express';
// import dotenv from 'dotenv';

// import cookieParser from 'cookie-parser'; // ✅ required for JWT cookies

// import authRoutes from './routes/auth.routes.js'; 
// import messageRoutes from './routes/message.routes.js';
// import userRoutes from './routes/user.routes.js';


// import connectToMongoDB from './db/connectToMongoDB.js';
// import {app, server} from "./socket/socket.js";
// const PORT = process.env.PORT || 5000;

// dotenv.config();
// // const app = express();



// app.use(express.json());
// app.use(cookieParser()); // parses cookies from req.cookies

// // app.get("/test-cookie", (req, res) => {
// //   console.log("Cookies:", req.cookies);
// //   res.send("Check your terminal for cookies!");
// // });

// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);

//  // to parse are incoming JSON requests (from req.body)
// // app.get('/', (req, res) => {
// //   //route Route //location: http://localhost:5000/
// //     res.send('HELLO BhaiLog');
// // });



// server.listen(PORT, async () => {
//   connectToMongoDB();
//   console.log(`Server is running on port ${PORT}`);
  
// });
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

dotenv.config();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// ✅ Important: Enable CORS to allow cookies from frontend (adjust origin as needed)
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // allow cookies to be sent
  })
);

// ✅ Route mounting
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Optional health check route
app.get('/', (req, res) => {
  res.send('LetsConnect API is running 🚀');
});

// ✅ Start server + connect DB
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
