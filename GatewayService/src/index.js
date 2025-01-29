import express from "express";
import axios from "axios";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
const AUTH_SERVICE_URL = "http://localhost:3002";
// const PRODUCTS_SERVICE_URL = "http://localhost:3002";
// const LEADS_SERVICE_URL = "http://localhost:3002";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/signup`, req.body);
    console.log(response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Error during signup process" });
  }
});

app.post("/login", async (req, res) => {
  console.log("got login request");
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
    console.log(response.status);
    // קבלת ה-JWT מ-Auth Service
    const { token } = response.data;
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login process" });
  }
});

// app.post("/example", async (req, res) => {
//   console.log('got login request')
//   try {
//     const response = await axios.post(`${EXAMPLE_SERVICE_URL}/example`, req.body);
//     console.log(response.status)
//     res.status(response.status).json(response.data);
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Error during example process" });
//   }
// });

app.listen(PORT, () => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
});
