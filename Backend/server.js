import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import authRoutes from "./Routes/authRoutes.js";
import boardRoutes from "./Routes/boardRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js"
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
