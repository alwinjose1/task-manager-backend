const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // Reference to auth_user
    required: true,
    unique: true   // ensures 1-to-1 relationship
  },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  experience: { type: Number, required: true } // years of experience
});

module.exports = mongoose.model("Teacher", teacherSchema);
