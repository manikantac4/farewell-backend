const express = require("express");
const router = express.Router();

// ✅ IMPORT BOTH FUNCTIONS
const { submitResponse, getResponses } = require("../controllers/responseController");

router.post("/submit", submitResponse);
router.get("/responses", getResponses);

module.exports = router;