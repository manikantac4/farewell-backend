const express = require("express");
const router = express.Router();
const { submitResponse } = require("../controllers/responseController");

router.post("/submit", submitResponse);

module.exports = router;