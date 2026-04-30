// routes/responseRoutes.js

const express = require("express");
const router = express.Router();

const { submitResponse, getResponses } = require("../controllers/responseController");

router.post("/submit", submitResponse);
router.get("/responses", getResponses);

module.exports = router;