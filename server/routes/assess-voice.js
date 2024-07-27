const express = require("express");
const assess_voice = require("../controllers/assess-voice"); // Correct import without destructuring
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/assess-voice", assess_voice); // Pass assess_voice as a callback function

module.exports = router;
