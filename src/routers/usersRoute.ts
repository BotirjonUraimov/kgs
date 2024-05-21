// import express, { Router } from "express";
// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const router: Router = express.Router();

// router.post("/deduct", async (req, res) => {
//   const { userId, amount } = req.body;
//   const client = await pool.connect();

//   try {
//     await client.query("BEGIN");
//     const queryText =
//       "UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance";
//     const result = await client.query(queryText, [amount, userId]);
//     await client.query("COMMIT");
//     res.json(result.rows[0]);
//   } catch (error: any) {
//     await client.query("ROLLBACK");
//     res.status(500).json({ error: error.message });
//   } finally {
//     client.release();
//   }
// });

// export default router;

import express, { Router } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const router: Router = express.Router();

router.post("/deduct", async (req, res) => {
  const { userId, amount } = req.body;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "SELECT balance FROM users WHERE id = $1 FOR UPDATE";
    const user = await client.query(queryText, [userId]);

    if (user.rows.length === 0) {
      throw new Error("User not found");
    }

    if (user.rows[0].balance < amount) {
      throw new Error("Insufficient funds");
    }

    const updateText =
      "UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance";
    const result = await client.query(updateText, [amount, userId]);
    await client.query("COMMIT");
    res.json(result.rows[0]);
  } catch (error: any) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

export default router;
