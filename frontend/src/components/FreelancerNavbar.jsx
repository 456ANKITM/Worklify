import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  HelpCircle,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useSelector } from "react-redux";
import FreelancerSidebar from "./FreelancerSidebar";

const FreelancerNavbar = () => {
  const user = useSelector((state)=>state.auth.user)
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_1px_0_#e4e4e7,0_8px_30px_rgba(0,0,0,0.06)]"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">

            {/* ================= LEFT: LOGO ================= */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => navigate("/")}
                className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-extrabold cursor-pointer"
              >
                W
              </div>

              <span className="text-xl font-bold tracking-tight hidden sm:block">
                Worklify
              </span>
            </div>

            {/* ================= CENTER: SEARCH ================= */}
            <div className="hidden md:flex flex-1 max-w-xl mx-6">
              <div className="flex items-center w-full bg-gray-100 hover:bg-gray-200 transition rounded-full px-4 py-2 gap-2">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for jobs"
                  className="bg-transparent w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* ================= RIGHT: ACTIONS ================= */}
            <div className="flex items-center gap-3">

              {/* Help */}
              <button className="hidden sm:flex items-center gap-1 text-sm px-3 py-2 rounded-full hover:bg-gray-100 transition">
                <HelpCircle size={18} />
                Help
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <Bell size={20} />
                {/* <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
              </button>

              {/* Messages */}
              <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
                <MessageCircle size={20} />
                {/* <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span> */}
              </button>

              {/* Profile */}
   <div
  onClick={() => setSidebarOpen(true)}
  className="w-9 h-9 rounded-full cursor-pointer overflow-hidden border border-gray-200 hover:scale-105 transition"
>
  {user?.profile?.profileImage ? (
    <img
      src={user.profile.profileImage}
      alt="profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white text-sm font-bold">
      {user?.freelancerProfile?.freelancerName?.charAt(0) ||
        user?.email?.charAt(0) ||
        "U"}
    </div>
  )}
</div>

              {/* Mobile menu */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE SEARCH ================= */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent w-full outline-none text-sm"
            />
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white animate-in fade-in slide-in-from-top-2">
            <div className="px-4 py-3 flex flex-col gap-2">

              <button className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-gray-100">
                <HelpCircle size={18} /> Help
              </button>

              <button className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-gray-100">
                <Bell size={18} /> Notifications
              </button>

              <button className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-gray-100">
                <MessageCircle size={18} /> Messages
              </button>

              <button
                onClick={() => navigate("/freelancer/dashboard")}
                className="flex items-center gap-2 px-3 py-3 rounded-xl hover:bg-gray-100"
              >
                Profile
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[104px]" />
      <FreelancerSidebar
  isOpen={sidebarOpen}
  setIsOpen={setSidebarOpen}
/>
    </>
  );
};

export default FreelancerNavbar;