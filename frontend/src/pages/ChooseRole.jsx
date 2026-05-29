import { useNavigate } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

import {
  Briefcase,
  User,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ChooseRole = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    if (role === "freelancer") {
      navigate("/freelancer/signup");
    } else {
      navigate("/client/signup");
    }
  };

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
        <div className="max-w-5xl w-full text-center">
          {/* HEADER */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 border border-black px-5 py-2 rounded-full mb-6">
              <Sparkles size={18} />
              <span className="text-sm font-medium">
                Join Our Platform
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-black">
              How do you want to join us?
            </h1>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Choose your role to continue. You can either hire talented
              freelancers or offer your skills to clients.
            </p>
          </div>

          {/* ROLE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FREELANCER */}
            <div
              onClick={() => handleRoleSelect("freelancer")}
              className="group cursor-pointer border border-gray-200 rounded-3xl p-10 bg-white hover:border-black hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto bg-black text-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition">
                <User size={34} />
              </div>

              <h2 className="text-2xl font-black text-black mt-6">
                I am a Freelancer
              </h2>

              <p className="text-gray-500 mt-3">
                I want to find jobs, work with clients, and earn money using
                my skills.
              </p>

              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} />
                  Get freelance jobs
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} />
                  Build your portfolio
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} />
                  Work remotely
                </div>
              </div>

              <button className="mt-8 w-full bg-black text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:scale-105 transition">
                Continue as Freelancer
                <ArrowRight size={18} />
              </button>
            </div>

            {/* CLIENT */}
            <div
              onClick={() => handleRoleSelect("client")}
              className="group cursor-pointer border border-gray-200 rounded-3xl p-10 bg-white hover:border-black hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto bg-black text-white rounded-3xl flex items-center justify-center group-hover:scale-110 transition">
                <Briefcase size={34} />
              </div>

              <h2 className="text-2xl font-black text-black mt-6">
                I am a Client
              </h2>

              <p className="text-gray-500 mt-3">
                I want to hire freelancers and get my projects done
                professionally.
              </p>

              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} />
                  Post jobs easily
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} />
                  Hire top talent
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} />
                  Manage projects
                </div>
              </div>

              <button className="mt-8 w-full bg-black text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 group-hover:scale-105 transition">
                Continue as Client
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* FOOTNOTE */}
          <p className="text-gray-400 text-sm mt-12">
            You can always change your role later from settings.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ChooseRole;