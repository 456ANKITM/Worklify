import Footer from "../components/Footer";
import PublicNavbar from "../components/PublicNavbar";
import { useSearchParams } from "react-router-dom";
import { useSearchJobsQuery } from "../redux/api/jobApi";
import { MapPin, Briefcase, Clock } from "lucide-react";

const SearchedJobs = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading, isError } = useSearchJobsQuery(query, {
    skip: !query,
  });

  console.log(data)

  const jobs = data?.data || [];



  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-black">
              Job Marketplace
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {query ? `Results for "${query}"` : "Browse latest jobs"}
            </p>
          </div>

          {/* States */}
          {isLoading && (
            <p className="text-zinc-500">Loading jobs...</p>
          )}

          {isError && (
            <p className="text-red-500">Failed to load jobs</p>
          )}

          {/* Cards */}
          <div className="space-y-5">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="group border border-zinc-200 rounded-2xl p-6 bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >

                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

                  {/* Title + Type */}
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      {job.title}
                    </h2>

                    <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.jobType || "Remote"}
                      </span>

                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location || "Anywhere"}
                      </span>
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-black">
                      {job.budget ? `NPR ${job.budget}` : "Negotiable"}
                    </p>
                    <p className="text-xs text-zinc-500 flex items-center justify-end gap-1">
                      <Clock size={12} />
                      Posted recently
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-700 mt-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Skills */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skillsRequired?.length > 0 ? (
                    job.skillsRequired.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-zinc-100 text-zinc-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-400">
                      No skills listed
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between">

                  <span className="text-xs text-zinc-500">
                    Posted by client
                  </span>

                  <button className="text-sm font-medium text-black hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {!isLoading && jobs.length === 0 && (
            <div className="text-center text-zinc-500 mt-20">
              No jobs found
            </div>
          )}

        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchedJobs;