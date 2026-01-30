import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import TodoItem from "../components/TodoItem";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { PlusCircle } from "lucide-react";

export default function BoardDetails() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await API.get(`/todos/${id}`);
      setTodos(res.data);
    } catch {
      toast.error("Failed to load todos");
    }
  };

  const createTodo = async () => {
    if (!title.trim()) return toast.error("Todo title required");
    try {
      await API.post(`/todos/${id}`, { title });
      toast.success("Todo added");
      setTitle("");
      fetchTodos();
    } catch {
      toast.error("Failed to add todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 px-6 py-10">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Board Tasks
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track tasks inside this board
          </p>
        </div>

        {/* Add Todo Card */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row gap-4 items-center">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={createTodo}
              className="flex items-center gap-2 bg-indigo-600
                         text-white px-6 py-3 rounded-xl
                         hover:bg-indigo-700 transition"
            >
              <PlusCircle size={18} />
              Add Todo
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {todos.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  No tasks yet
                </h3>
                <p className="text-gray-500 mt-1">
                  Add your first task to get started ✨
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  refresh={fetchTodos}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
