import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow px-8 py-4 flex justify-between items-center">
     <h1
  className="text-xl font-bold text-indigo-600 flex items-center gap-2 cursor-pointer"
  onClick={() => navigate("/dashboard")}
>
  <MdDashboard /> To-Do App
</h1>

      <div className="flex items-center gap-4">
        <span className="text-gray-600">
          👋 Hi, <strong>{user}</strong>
        </span>
        <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
>
  <FiLogOut /> Logout
</button>
      </div>
    </nav>
  );
}
