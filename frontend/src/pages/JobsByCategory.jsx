import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import PublicNavbar from "../components/PublicNavbar";
import { useGetJobsByCategoryQuery } from "../redux/api/jobApi";

import {
  Briefcase,
  Clock3,
  MapPin,
  DollarSign,
  ArrowRight,
  Building2,
  Sparkles,
} from "lucide-react";

const JobsByCategory = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);

  const { data, isLoading } = useGetJobsByCategoryQuery(decodedCategory);

  const jobs = data?.data || [];

  console.log("Category:", decodedCategory);
  console.log("Jobs:", data);

  if (isLoading) {
    return (
      <>
        <PublicNavbar />

        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-black border-t-transparent animate-spin"></div>

            <p className="text-lg font-semibold text-black">
              Loading {decodedCategory} Jobs...
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
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 border border-black px-5 py-2 rounded-full mb-6">
              <Sparkles size={18} />
              <span className="font-medium text-sm">
                Category Jobs
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-black">
              {decodedCategory}
            </h1>

            <p className="mt-4 text-gray-500">
              Explore all available jobs in this category
            </p>
          </div>
        </section>

        {/* JOB GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="text-3xl font-black text-black">
              {jobs.length} Jobs Found
            </h2>

            <button className="border border-black px-5 py-3 rounded-xl font-semibold hover:bg-black hover:text-white transition">
              Browse All Jobs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group border border-gray-200 rounded-3xl p-6 bg-white hover:border-black hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                      <Briefcase size={22} />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-black line-clamp-1">
                        {job.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-1">
                        <Building2 size={15} className="text-gray-500" />
                        <p className="text-gray-500 text-sm">
                          {job?.clientId?.clientName || "Company"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                    {job.status}
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-6 text-gray-600 line-clamp-3 min-h-[70px]">
                  {job.description}
                </p>

                {/* SKILLS */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {job.skillsRequired?.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* BUDGET */}
                <div className="mt-6 bg-gray-50 rounded-2xl p-4">
                  <p className="text-sm text-gray-500">Budget</p>
                  <h4 className="text-xl font-black text-black">
                    NPR {job.budget}
                  </h4>
                </div>

                {/* FOOTER */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={15} />
                    <span>Nepal • Remote</span>
                  </div>

                  <button className="bg-black text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition">
                    Apply
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {jobs.length === 0 && (
            <div className="border border-dashed border-gray-300 rounded-3xl p-16 text-center mt-10">
              <h2 className="text-3xl font-black text-black">
                No Jobs Found
              </h2>
              <p className="text-gray-500 mt-4">
                No jobs available in this category right now.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default JobsByCategory;