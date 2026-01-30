import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../Controller/todoController.js";

const router = express.Router();

router.post("/:boardId", authMiddleware, createTodo);
router.get("/:boardId", authMiddleware, getTodos);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
