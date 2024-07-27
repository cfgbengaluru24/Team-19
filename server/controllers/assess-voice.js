const gemini = require("../utils/gemini");
const dotenv = require("dotenv");
dotenv.config();

const assess_voice = async (req, res) => {
  const { question, answer } = req.body;
  const voice = `${question} ${answer}`;
  try {
    const response = await gemini.run(voice); // Run Gemini and await the response
    console.log(response.text());

    return res.status(200).json({ score: response.text() });
  } catch (error) {
    console.error("Error in assess_voice:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong in assess_voice" });
  }
};

module.exports = assess_voice; // Correctly export the function
