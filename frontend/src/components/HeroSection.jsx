import React from "react";
import { Search, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-zinc-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[450px] h-[450px] bg-zinc-200 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl w-full mx-auto sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 shadow-sm mb-8">
           

            <span className="text-sm font-medium text-zinc-700">
              Trusted by freelancers & startups across Nepal
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-black">
            Hire skilled freelancers for your next big project.
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-600 leading-8">
            Connect with top developers, designers, marketers, and creators.
            Find verified talent, collaborate seamlessly, and build faster.
          </p>

          {/* Search Box */}
          <div className="mt-12 w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-3">
            <div className="flex items-center flex-1 px-4">
              <Search size={20} className="text-zinc-400 shrink-0" />

              <input
                type="text"
                placeholder="Search for services, skills, or jobs..."
                className="w-full px-3 py-4 outline-none text-sm sm:text-base bg-transparent placeholder:text-zinc-400"
              />
            </div>

            <button className="bg-black hover:bg-zinc-800 transition-all duration-300 text-white rounded-xl px-6 py-4 text-sm sm:text-base font-semibold flex items-center justify-center gap-2">
              Search
              <ArrowRight size={18} />
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-black text-white hover:bg-zinc-800 transition-all duration-300 rounded-xl px-8 py-4 text-sm sm:text-base font-semibold shadow-lg hover:-translate-y-1">
              Hire Talent
            </button>

            <button className="border border-zinc-300 hover:border-black hover:bg-zinc-100 transition-all duration-300 rounded-xl px-8 py-4 text-sm sm:text-base font-semibold">
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;