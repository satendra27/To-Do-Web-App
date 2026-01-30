import Todo from "../Model/Todo.js";
import Board from "../Model/Board.js";

// Create Todo
export const createTodo = async (req, res) => {
  try {
    const board = await Board.findOne({
      _id: req.params.boardId,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const todo = await Todo.create({
      title: req.body.title,
      board: board._id,
      user: req.user._id
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Todos of a Board
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      board: req.params.boardId,
      user: req.user._id
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
