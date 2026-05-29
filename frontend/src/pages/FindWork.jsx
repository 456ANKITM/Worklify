import Footer from "../components/Footer";
import PublicNavbar from "../components/PublicNavbar";
import { useGetAllJobsQuery } from "../redux/api/jobApi";

import {
  Briefcase,
  Clock3,
  MapPin,
  DollarSign,
  ArrowRight,
  Building2,
  Sparkles,
  ShieldCheck,
  Brain,
  Database,
  Cloud,
  Bug,
  Video,
  PenSquare,
  Megaphone,
  Code2,
  Smartphone,
  Globe,
} from "lucide-react";

const categoryIcons = {
  "AI and ML": <Brain size={22} />,
  "QA and Testing": <Bug size={22} />,
  "DevOps and Cloud": <Cloud size={22} />,
  "Video Editing": <Video size={22} />,
  "Content Writing": <PenSquare size={22} />,
  Cybersecurity: <ShieldCheck size={22} />,
  "Data Science": <Database size={22} />,
  "Digital Marketing": <Megaphone size={22} />,
  "Software Development": <Code2 size={22} />,
};

const FindWork = () => {
  const { data, isLoading } = useGetAllJobsQuery();

  const jobs = data?.data || [];

  if (isLoading) {
    return (
      <>
        <PublicNavbar />

        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-black border-t-transparent animate-spin"></div>

            <p className="text-lg font-semibold text-black">
              Loading Amazing Jobs...
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <PublicNavbar />

      <div className="bg-white min-h-screen">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-black px-5 py-2 rounded-full mb-6">
              <Sparkles size={18} />

              <span className="font-medium text-sm">
                Discover Premium Freelance Opportunities
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight max-w-5xl mx-auto">
              Find Your Dream Freelance Job Today
            </h1>

            <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Explore high-quality freelance jobs from startups, businesses,
              and growing companies. Work remotely, grow your career, and get
              paid for your skills.
            </p>

            {/* STATS */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
              <div className="border border-gray-200 rounded-3xl p-6">
                <h2 className="text-3xl font-black text-black">
                  {jobs.length}+
                </h2>

                <p className="text-gray-500 mt-2">Open Jobs</p>
              </div>

              <div className="border border-gray-200 rounded-3xl p-6">
                <h2 className="text-3xl font-black text-black">12+</h2>

                <p className="text-gray-500 mt-2">Categories</p>
              </div>

              <div className="border border-gray-200 rounded-3xl p-6">
                <h2 className="text-3xl font-black text-black">Remote</h2>

                <p className="text-gray-500 mt-2">Flexible Work</p>
              </div>

              <div className="border border-gray-200 rounded-3xl p-6">
                <h2 className="text-3xl font-black text-black">Fast</h2>

                <p className="text-gray-500 mt-2">Hiring Process</p>
              </div>
            </div>
          </div>
        </section>

        {/* JOBS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-black">
                Latest Open Jobs
              </h2>

              <p className="text-gray-500 mt-2">
                Hand-picked freelance opportunities waiting for talented people
                like you.
              </p>
            </div>

            <button className="border border-black px-5 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition-all duration-300">
              Browse All Jobs
            </button>
          </div>

          {/* JOB GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group border border-gray-200 rounded-3xl p-6 bg-white hover:border-black hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center">
                      {categoryIcons[job?.category] || (
                        <Briefcase size={24} />
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-black line-clamp-1">
                        {job?.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <Building2 size={15} className="text-gray-500" />

                        <p className="text-gray-500 text-sm">
                          {job?.clientId?.clientName ||
                            "Company"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job?.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {job?.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 text-gray-600 leading-relaxed line-clamp-3 min-h-[75px]">
                  {job?.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {job?.skillsRequired
                    ?.slice(0, 4)
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-black"
                      >
                        {skill}
                      </span>
                    ))}
                </div>

                {/* JOB DETAILS */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      

                      <span className="text-sm font-medium">
                        Budget
                      </span>
                    </div>

                    <h4 className="text-xl font-black text-black">
                      NPR {job?.budget}
                    </h4>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Clock3 size={16} />

                      <span className="text-sm font-medium">
                        Type
                      </span>
                    </div>

                    <h4 className="text-lg font-black text-black">
                      Remote
                    </h4>
                  </div>
                </div>

                {/* RESPONSIBILITIES */}
                <div className="mt-6">
                  <h4 className="font-bold text-black mb-3">
                    Key Responsibilities
                  </h4>

                  <div className="space-y-2">
                    {job?.keyResponsibilities
                      ?.slice(0, 2)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 rounded-full bg-black mt-2"></div>

                          <p>{item}</p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={15} />

                    <span>Nepal • Remote</span>
                  </div>

                  <button className="group/button bg-black text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300">
                    Apply Now

                    <ArrowRight
                      size={16}
                      className="group-hover/button:translate-x-1 transition-all duration-300"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {jobs.length === 0 && (
            <div className="border border-dashed border-gray-300 rounded-3xl p-16 text-center mt-10">
              <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase size={34} />
              </div>

              <h2 className="text-3xl font-black text-black">
                No Jobs Available
              </h2>

              <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                There are currently no open freelance opportunities.
                New jobs will appear here soon.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default FindWork;