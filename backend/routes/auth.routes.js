import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("SignUp Route");
});

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;