import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4001;

app.get("/", (req, res) => {
  res.send("Hello from Backend 1!");
});

app.listen(PORT, () => {
  console.log(`Backend 1 running on port ${PORT}`);
});
