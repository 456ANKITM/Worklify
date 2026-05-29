import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
          isScrolled
            ? "shadow-[0_1px_0_#e4e4e7,0_4px_24px_rgba(0,0,0,0.06)]"
            : ""
        }`}
      >

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-2 text-black select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-sm font-extrabold">
                W
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Worklify
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a
                href="/find-work"
                className="relative text-sm font-medium after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Find Work
              </a>

              <a
                href="/find-talent"
                className="relative text-sm font-medium after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-black after:transition-all hover:after:w-full"
              >
                Find Talent
              </a>

            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="border border-zinc-200 hover:border-black hover:bg-zinc-100 transition-all text-sm font-medium rounded-lg px-5 py-2">
                Log in
              </button>

              <button 
              onClick={()=>navigate("/choose-role")}
              className="border border-zinc-200 hover:border-black hover:bg-zinc-100 transition-all text-sm font-medium rounded-lg px-5 py-2">
                Sign up
              </button>

              <button className="bg-black text-white text-sm font-semibold rounded-lg px-5 py-2.5 hover:-translate-y-0.5 hover:shadow-xl transition-all">
                Post a Job →
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span
                className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
                  mobileOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />

              <span
                className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />

              <span
                className={`block w-5 h-0.5 bg-black transition-all duration-200 ${
                  mobileOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-zinc-100 bg-white animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {["Find Work", "Find Talent"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="px-3 py-3 rounded-xl text-sm font-medium hover:bg-zinc-100 transition-colors"
                >
                  {item}
                </a>
              ))}

            

              {/* Mobile Buttons */}
              <div className="flex flex-col gap-2 pt-4 mt-3 border-t border-zinc-100">
                <button className="w-full border border-zinc-200 rounded-lg py-2.5 text-sm font-medium hover:border-black hover:bg-zinc-100 transition-all">
                  Log in
                </button>

                <button 
                onClick={()=>navigate("/choose-role")}
                className="w-full border border-zinc-200 rounded-lg py-2.5 text-sm font-medium hover:border-black hover:bg-zinc-100 transition-all">
                  Sign up
                </button>

                <button className="w-full bg-black text-white rounded-lg py-2.5 text-sm font-semibold hover:shadow-xl transition-all">
                  Post a Job →
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-[104px]" />
    </>
  );
};

export default PublicNavbar;