const Response = require("../models/Response");

exports.submitResponse = async (req, res) => {
  try {
    const { sessionId, section, answers } = req.body;

   if (!sessionId || !section || !Array.isArray(answers) || answers.length !== 10) {
  return res.status(400).json({ message: "All 10 answers required" });
}

    const exists = await Response.findOne({ sessionId });
    if (exists) {
      return res.status(400).json({ message: "Already submitted" });
    }

    const newResponse = new Response({
      sessionId,
      section,
      answers
    });

    await newResponse.save();

    res.status(200).json({ message: "Submitted successfully ✅" });

  } catch (error) {
  console.log(error); // 👈 ADD THIS
  res.status(500).json({ message: "Server error", error: error.message });
}
};
// GET responses by section
exports.getResponses = async (req, res) => {
  try {
    const { section } = req.query;

    let filter = {};
    if (section) {
      filter.section = section;
    }

    const data = await Response.find(filter).sort({ createdAt: -1 });

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
};