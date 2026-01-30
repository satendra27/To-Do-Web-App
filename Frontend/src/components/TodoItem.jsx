import API from "../services/api";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

export default function TodoItem({ todo, refresh }) {
  const toggleComplete = async () => {
    try {
      await API.put(`/todos/${todo._id}`, {
        completed: !todo.completed
      });
      refresh();
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const updateTodo = async (e) => {
    e.stopPropagation();
    const newTitle = prompt("Update todo", todo.title);
    if (!newTitle) return;

    try {
      await API.put(`/todos/${todo._id}`, { title: newTitle });
      toast.success("Todo updated");
      refresh();
    } catch {
      toast.error("Failed to update todo");
    }
  };

  const deleteTodo = async (e) => {
    e.stopPropagation();
    try {
      await API.delete(`/todos/${todo._id}`);
      toast.success("Todo deleted");
      refresh();
    } catch {
      toast.error("Failed to delete todo");
    }
  };

  return (
    <div
      onClick={toggleComplete}
      className={`group flex items-center justify-between p-4 border-b
      cursor-pointer select-none
      transition-all duration-200
      ${todo.completed
        ? "bg-green-50"
        : "bg-white hover:bg-indigo-50"}
      active:scale-[0.99]`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <div
          className={`w-5 h-5 flex items-center justify-center rounded border-2
          transition-all
          ${todo.completed
            ? "bg-green-500 border-green-500"
            : "border-gray-400 group-hover:border-indigo-500"}`}
        >
          {todo.completed && (
            <span className="text-white text-xs font-bold">✓</span>
          )}
        </div>

        {/* Title */}
        <span
          className={`text-base ${
            todo.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={updateTodo}
          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
          title="Edit"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={deleteTodo}
          className="p-2 rounded-lg hover:bg-red-100 text-red-600"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
