const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teacher");
const authMiddleware = require("../middleware/auth"); // JWT middleware

// Create teacher profile (only logged-in users)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, subject, experience } = req.body;

    // Prevent duplicate teacher profile for same user
    const existingTeacher = await Teacher.findOne({ user: req.user.id });
    if (existingTeacher) {
      return res.status(400).json({ msg: "Teacher profile already exists" });
    }

    const teacher = new Teacher({
      user: req.user.id,
      name,
      subject,
      experience
    });

    await teacher.save();
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get logged-in teacher profile
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id }).populate("user", ["email"]);
    if (!teacher) {
      return res.status(404).json({ msg: "No teacher profile found" });
    }
    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
