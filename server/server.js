const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.development") });

const { Pool } = require("pg");

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test route
app.get("/api/home", (req, res) => {
  res.json({ message: "Welcome to Wallet Wizard Project" });
});

// GET all transactions
app.get("/transactions", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, c.name AS category_name
      FROM transactions t
      JOIN category c ON t.category_id = c.id
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
