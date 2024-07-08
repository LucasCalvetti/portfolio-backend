const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sendEmail } = require("./lib/emailService");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "https://lucascalvetti.github.io/portfolio-frontend/",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.post("/send-email", async (req, res) => {
  const { email, name, description } = req.body;

  if (!email || !name || !description) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const result = await sendEmail(email, name, description);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error enviando el correo" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
