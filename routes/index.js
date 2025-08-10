import express from "express";
import passport, { users } from "../config/passport-jwt.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const router = express.Router();

// Login route: validate credentials, generate and send JWT if valid
router.post("/login", (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      // Sign JWT with user ID payload and expiry
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({ token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong");
  }
});

// Protected route: accessible only if JWT token is valid
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false, failureRedirect: "/error" }),
  (req, res) => {
    res.send(`Welcome to dashboard, ${req.user.username}`);
  },
);

// Error route for failed authentication
router.get("/error", (req, res) => {
  res.status(401).send("Please login again");
});

export default router;
