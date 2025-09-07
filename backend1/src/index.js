import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch"; 

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4001;
const BACKEND2_URL = process.env.BACKEND2_URL

app.get("/", (req, res) => {
  res.send("Hello from Backend 1!");
});

app.get("/test", async (req, res) => {
  try {
    const response = await fetch(`${BACKEND2_URL}/`);
    const data = await response.text();
    res.send(`Calling Backend2: ${data}`);
  } catch (err) {
    res.status(500).send(`Error calling Backend2: ${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Backend 1 running on port ${PORT}`);
});
