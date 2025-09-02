const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/auth");

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({ user: req.user.id, title, description });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, status },
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
