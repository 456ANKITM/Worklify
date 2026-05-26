import React from "react";
import { ArrowRight, BriefcaseBusiness, Search } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="w-full bg-white px-4 md:px-10 py-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-white px-6 md:px-12 py-14 md:py-20 hover:shadow-2xl transition-all duration-300">
          
          {/* Subtle Background Effects */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-black/[0.03] rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/[0.03] rounded-full blur-3xl" />

          {/* Main Content */}
          <div className="relative z-10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-12">
            
            {/* Left Side */}
            <div className="max-w-3xl">
              <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 mb-5">
                Start Today
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-black mb-6">
                Build Your Career <br className="hidden md:block" />
                or Hire Top Talent
              </h2>

              <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                Join a modern freelance marketplace where professionals discover
                opportunities and clients connect with skilled talent securely
                and efficiently.
              </p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col sm:flex-row xl:flex-col gap-4 w-full xl:w-auto">
              
              {/* Freelancer CTA */}
              <button className="group flex items-center justify-center gap-3 rounded-2xl bg-black text-white px-7 py-4 font-medium hover:bg-gray-900 transition-all duration-300 w-full sm:w-auto">
                <Search size={20} />

                Start Freelancing

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              {/* Client CTA */}
              <button className="group flex items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white text-black px-7 py-4 font-medium hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto">
                <BriefcaseBusiness size={20} />

                Post a Job

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 mt-14 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                10K+
              </h3>

              <p className="text-sm text-gray-500">
                Freelancers Active
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                5K+
              </h3>

              <p className="text-sm text-gray-500">
                Projects Completed
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-2">
                99%
              </h3>

              <p className="text-sm text-gray-500">
                Secure Payments
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;