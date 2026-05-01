// controllers/responseController.js


const Response = require("../models/Response");

// AFTER
const Response = require("../models/Response3rdYear");
// ✅ Roll validation
const isValidRoll = (roll) => {
  const regular = /^238W1A12(\d{2}|[A-D]\d)$/;   // 66–99, A0–D0
  const lateral = /^248W5A12LE(7|8|9|10|11|12|13)$/;
  return regular.test(roll) || lateral.test(roll);
};

exports.submitResponse = async (req, res) => {
  try {
    const { sessionId, studentName, answers } = req.body;

    // ✅ VALIDATION
    if (!sessionId || !studentName || !Array.isArray(answers) || answers.length !== 20) {
      return res.status(400).json({ message: "All fields required (20 answers)" });
    }

    // ✅ Prevent duplicate submission
    const exists = await Response.findOne({ sessionId });
    if (exists) {
      return res.status(400).json({ message: "Already submitted" });
    }

    // ✅ Validate roll numbers
    for (let ans of answers) {
      if (!ans.answer || !isValidRoll(ans.answer)) {
        return res.status(400).json({
          message: `Invalid roll number: ${ans.answer}`
        });
      }
    }

    const cleanName = studentName.trim();

    // ✅ Save
    const newResponse = new Response({
      sessionId,
      studentName: cleanName,
      answers
    });

    await newResponse.save();

    res.status(200).json({ message: "Submitted successfully ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ GET all responses
exports.getResponses = async (req, res) => {
  try {
    const data = await Response.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};