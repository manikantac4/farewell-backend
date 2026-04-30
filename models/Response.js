// models/Response.js

const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },

  studentName: {
    type: String,
    required: true,
    trim: true
  },

  answers: [
    {
      question: String,
      answer: {
        type: String,
        required: true
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Response", ResponseSchema);