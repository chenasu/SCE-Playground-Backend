import express from "express";
import pkg from "pg";
const { Client } = pkg;
import cors from "cors";

const app = express();
const port = 3002;

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: "DBMSPost",
  database: 'users',
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error ", err.stack));

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query(
      "SELECT * FROM login_data WHERE username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await client.query(
      "INSERT INTO login_data (username, pass) VALUES ($1, $2)",
      [username, password]
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during registration" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await client.query(
      "SELECT * FROM login_data WHERE username = $1 AND pass = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
});

app.listen(port, () => {
  console.log(`UserServuce is running at http://localhost:${port}`);
});
