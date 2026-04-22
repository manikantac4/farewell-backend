const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  section: {
    type: String,
    enum: ["ITA", "ITB", "ITC"],
    required: true
  },
  answers: [
    {
      question: String,
      answer: {
            type: String,
            required: true,
            match: /^[0-9]+$/   // ✅ ONLY NUMBERS (roll no)
          }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Response", ResponseSchema);