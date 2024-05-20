import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
import itemsRoute from "./routers/itemsRoute";
import usersRoute from "./routers/usersRoute";

app.use("/api/items", itemsRoute);
app.use("/api/users", usersRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
