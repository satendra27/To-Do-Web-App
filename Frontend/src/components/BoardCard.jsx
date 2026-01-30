import API from "../services/api";
import toast from "react-hot-toast";
import { Pencil, Trash2, Folder } from "lucide-react";

export default function BoardCard({ board, refresh, onOpen }) {
  const deleteBoard = async (e) => {
    e.stopPropagation();
    try {
      await API.delete(`/boards/${board._id}`);
      toast.success("Board deleted");
      refresh();
    } catch {
      toast.error("Failed to delete board");
    }
  };

  const updateBoard = async (e) => {
    e.stopPropagation();
    const newTitle = prompt("Update board title", board.title);
    if (!newTitle) return;

    try {
      await API.put(`/boards/${board._id}`, { title: newTitle });
      toast.success("Board updated");
      refresh();
    } catch {
      toast.error("Failed to update board");
    }
  };

  return (
    <div
      onClick={onOpen}
      className="group relative bg-white rounded-2xl p-6 shadow-md
                 hover:shadow-2xl hover:-translate-y-1
                 transition-all duration-300 cursor-pointer
                 border border-gray-100"
    >
      {/* Accent Bar */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-linear-to-r from-indigo-500 to-purple-500" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <Folder className="text-indigo-600" size={20} />
          </div>
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {board.title}
          </h2>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={updateBoard}
            className="p-2 rounded-lg hover:bg-blue-50 text-blue-600"
            title="Edit board"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={deleteBoard}
            className="p-2 rounded-lg hover:bg-red-50 text-red-600"
            title="Delete board"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-4 text-sm text-gray-500">
        Click to view and manage tasks →
      </p>
    </div>
  );
}
