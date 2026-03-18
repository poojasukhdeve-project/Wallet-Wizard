const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.development") });

const { Pool } = require("pg");

const app = express();
const PORT = 3100;

app.use(cors());
app.use(express.json());

// DB Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ================= CATEGORY =================

// GET categories
app.get("/category", async (req, res) => {
  const result = await pool.query("SELECT * FROM category ORDER BY id ASC");
  res.json(result.rows);
});

// CREATE category
app.post("/category", async (req, res) => {
  const { name } = req.body;

  const result = await pool.query(
    "INSERT INTO category (name, created_at) VALUES ($1, NOW()) RETURNING *",
    [name]
  );

  res.json(result.rows[0]);
});

// UPDATE CATEGORY
app.put("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      "UPDATE category SET name=$1 WHERE id=$2 RETURNING *",
      [name, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Update category error:", err);
    res.status(500).json({ error: "Update failed" });
  }
});

// DELETE CATEGORY
app.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM category WHERE id=$1", [id]);

    res.json({ message: "Category deleted" });
  } catch (err) {
    console.error("Delete category error:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});

// ================= TRANSACTIONS =================

// GET all
app.get("/transactions", async (req, res) => {
  const result = await pool.query(`
    SELECT t.*, c.name AS category_name
    FROM transactions t
    JOIN category c ON t.category_id = c.id
    ORDER BY t.id ASC
  `);

  res.json(result.rows);
});

// CREATE
app.post("/transaction", async (req, res) => {
  const { name, amount, date, description, category_id } = req.body;

  const result = await pool.query(
    `INSERT INTO transactions 
    (name, amount, date, description, category_id, created_at)
    VALUES ($1,$2,$3,$4,$5,NOW())
    RETURNING *`,
    [name, amount, date, description, category_id]
  );

  res.json(result.rows[0]);
});

// UPDATE
app.put("/transaction/:id", async (req, res) => {
  const { id } = req.params;
  const { name, amount, date, description, category_id } = req.body;

  const result = await pool.query(
    `UPDATE transactions 
     SET name=$1, amount=$2, date=$3, description=$4, category_id=$5
     WHERE id=$6 RETURNING *`,
    [name, amount, date, description, category_id, id]
  );

  res.json(result.rows[0]);
});

// DELETE
app.delete("/transaction/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM transactions WHERE id=$1", [id]);

  res.json({ message: "Deleted successfully" });
});

// START
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});