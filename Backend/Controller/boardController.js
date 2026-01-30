import Board from "../Model/Board.js";

// Create Board
export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      user: req.user._id
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Boards (user-specific)
export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Board
export const updateBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title: req.body.title },
      { new: true }
    );

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Board
export const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
