import pkg from 'pg';
const { Client } = pkg;

// Database connection configuration
const dbConfig = {
  host: 'dpg-cu2lctqj1k6c73cnm9rg-a.frankfurt-postgres.render.com',
  user: 'noa',
  password: "X67dCEkY8YQvqBiwNr2zKN4J5ETxv8GQ",
  database: 'users_oo4c',
  port: 5432,
  ssl: true
};

const createTableAndInsertUser = async () => {
  // SQL statements
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      fullname VARCHAR(100),
      password VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE
    );
  `;

  const insertUserQuery = `
    INSERT INTO users (username, fullname, password, email)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (username) DO NOTHING;
  `;

  // New user details
  const newUser = ['usersservice', 'User Service', 'usersservice@blabla', 'user.service@example.com'];

  const client = new Client(dbConfig);

  try {
    // Connect to PostgreSQL
    await client.connect();
    console.log("Connected to the database.");

    // Create table
    await client.query(createTableQuery);
    console.log("Users table created or already exists.");

    // Insert new user
    await client.query(insertUserQuery, newUser);
    console.log("New user added successfully!");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the connection
    await client.end();
    console.log("Database connection closed.");
  }
};

// Run the function
createTableAndInsertUser();
