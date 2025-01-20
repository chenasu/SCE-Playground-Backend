import express from "express";
import pkg from "pg";
import cors from "cors";
import jwt from "jsonwebtoken";

const { Client } = pkg;
const app = express();
const port = 3002;

const SECRET_KEY = "supersecretkey";

const client = new Client({
  host: 'dpg-cu2lctqj1k6c73cnm9rg-a.frankfurt-postgres.render.com',
  // host: 'postgresql://noa:X67dCEkY8YQvqBiwNr2zKN4J5ETxv8GQ@dpg-cu2lctqj1k6c73cnm9rg-a.frankfurt-postgres.render.com:5432/users_oo4c',
  user: 'noa',
  password: "X67dCEkY8YQvqBiwNr2zKN4J5ETxv8GQ",
  database: 'users_oo4c',
  port: 5432,
  ssl: true
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
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    await client.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
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
  console.log("Got login request", username, password);
  try {
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    console.log('result', result)
    if (result.rows.length > 0) {
            // יצירת JWT
            const user = result.rows[0]; // שליפת המשתמש
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
              expiresIn: "30d",
            });
      res.status(200).json({ message: "Login successful", token, user: result.rows[0] });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during login" });
  }
});

// Middleware לאימות JWT
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.authToken; // קריאת ה-JWT מ-Cookie
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // שמירת פרטי המשתמש לבקשה
    next();
  });
};

// Protected route לדוגמה
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.listen(port, () => {
  console.log(`UserServuce is running at http://localhost:${port}`);
});
