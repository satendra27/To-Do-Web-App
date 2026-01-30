import { useEffect, useState } from "react";
import API from "../services/api";
import BoardCard from "../components/BoardCard";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const fetchBoards = async () => {
    try {
      const res = await API.get("/boards");
      setBoards(res.data);
    } catch {
      toast.error("Failed to load boards");
    }
  };

  const createBoard = async () => {
    if (!title.trim()) return toast.error("Board title required");
    try {
      await API.post("/boards", { title });
      toast.success("Board created");
      setTitle("");
      fetchBoards();
    } catch {
      toast.error("Failed to create board");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-6 py-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Your Boards
          </h1>
          <p className="text-gray-500 mt-2">
            Organize your work into boards and track tasks efficiently
          </p>
        </div>

        {/* Create Board Card */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-4 items-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter new board name..."
              className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={createBoard}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              <Plus size={18} />
              Create Board
            </button>
          </div>
        </div>

        {/* Boards Grid */}
        <div className="max-w-7xl mx-auto">
          {boards.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                No boards yet
              </h2>
              <p className="text-gray-500 mt-2">
                Create your first board to start organizing your tasks 🚀
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {boards.map((board) => (
                <BoardCard
                  key={board._id}
                  board={board}
                  refresh={fetchBoards}
                  onOpen={() => navigate(`/board/${board._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
