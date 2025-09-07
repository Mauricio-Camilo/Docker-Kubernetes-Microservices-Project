import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4002;

app.get("/", (req, res) => {
  res.send("Hello from Backend 2");
});

app.get("/test", (req, res) => {
  res.send("Hello from Backend 2 calling from backend 1!");
});

app.listen(PORT, () => {
  console.log(`Backend 2 running on port ${PORT}`);
});
