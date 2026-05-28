import React, { useState } from "react";
import { Search, ArrowRight, BriefcaseBusiness, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleFindJobs = () => {
    if(!query.trim()) return;
    navigate(`/jobs/search?q=${encodeURIComponent(query)}`)
  };

  const handleHireFreelancers = () => {
    if(!query.trim()) return;
    navigate(`/freelancers/search?q=${encodeURIComponent(query)}`)
  };

  return (
    <section className="relative overflow-hidden bg-white flex items-center">
      
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[420px] h-[420px] bg-zinc-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[480px] h-[480px] bg-zinc-200 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24">
        
        <div className="flex flex-col items-center text-center">

          {/* Badge (moved higher) */}
          <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-sm mb-10">
            <span className="text-sm font-medium text-zinc-700">
              Trusted by freelancers & startups across Nepal
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-black">
            Find the right talent or get hired instantly.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-600 leading-8">
            Search for skills, projects, or expertise. Connect with verified
            freelancers and clients in seconds.
          </p>

          {/* Search Input (NO SEARCH BUTTON) */}
          <div className="mt-12 w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-xl p-3 flex items-center gap-3">
            
            <Search size={20} className="text-zinc-400 shrink-0 ml-2" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="e.g. Web Development, UI Design, Marketing..."
              className="w-full px-2 py-4 outline-none text-sm sm:text-base bg-transparent placeholder:text-zinc-400"
            />
          </div>

          {/* CTA Buttons (Driven by Input) */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">

            {/* Hire Talent */}
            <button
              onClick={handleHireFreelancers}
              className="group flex items-center justify-center gap-2 bg-black text-white hover:bg-zinc-800 transition-all duration-300 rounded-xl px-8 py-4 text-sm sm:text-base font-semibold shadow-lg hover:-translate-y-1"
            >
              <Users size={18} />
              Hire Talent
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>

            {/* Find Jobs */}
            <button
              onClick={handleFindJobs}
              className="group flex items-center justify-center gap-2 border border-zinc-300 hover:border-black hover:bg-zinc-100 transition-all duration-300 rounded-xl px-8 py-4 text-sm sm:text-base font-semibold"
            >
              <BriefcaseBusiness size={18} />
              Find Jobs
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;