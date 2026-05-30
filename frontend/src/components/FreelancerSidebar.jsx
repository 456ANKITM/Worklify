import { X, User, LayoutDashboard, MessageCircle, Bell, Settings, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const FreelancerSidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/freelancer/login");
  };

  return (
    <>
      {/* BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Account</h2>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={18} />
          </button>
        </div>

        {/* MENU */}
        <div className="p-4 space-y-2">

          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
            <User size={18} /> Profile
          </button>

          <button
            onClick={() => navigate("/freelancer/main")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
            <MessageCircle size={18} /> Messages
          </button>

          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
            <Bell size={18} /> Notifications
          </button>

          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
            <Settings size={18} /> Settings
          </button>

          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-100">
            <HelpCircle size={18} /> Support
          </button>

          {/* LOGOUT */}
          <div className="pt-4 border-t mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default FreelancerSidebar;