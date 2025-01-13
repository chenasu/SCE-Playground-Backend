import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 3000;
const AUTH_SERVICE_URL = "http://localhost:3002";

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/signup`, req.body);
    console.log(response.status)
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error during signup process" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
    console.log(response.status)
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login process" });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
