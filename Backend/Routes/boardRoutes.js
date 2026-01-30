import express from "express";
import {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard
} from "../Controller/boardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/", authMiddleware, getBoards);
router.put("/:id", authMiddleware, updateBoard);
router.delete("/:id", authMiddleware, deleteBoard);

export default router;
