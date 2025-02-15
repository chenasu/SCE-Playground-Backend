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
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.post("/signup", async (req, res) => {
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/signup`, req.body);
    console.log(response.status);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error from auth service:", error.response.data.message);
      res.status(error.response.status).json({
        message: error.response.data.message || "Error during signup process",
      });
    } else if (error.request) {
      console.error("No response received from auth service:", error.request);
      res.status(502).json({ message: "Bad Gateway: No response from service" });
    } else {
      console.error("General error:", error.message);
      res.status(500).json({ message: "Error during signup process" });
    }
  }
});

app.post("/login", async (req, res) => {
  console.log("got login request");
  try {
    const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
    console.log(response.status);
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
    if (error.response) {
      console.error("Error from auth service:", error.response.data.message);
      res.status(error.response.status).json({
        message: error.response.data.message || "Error during login process",
      });
    } else if (error.request) {
      console.error("No response received from auth service:", error.request);
      res.status(502).json({ message: "Bad Gateway: No response from service" });
    } else {
      console.error("Error during login:", error.message);
      res.status(500).json({ message: "Error during login process" });
    }
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

export { app };