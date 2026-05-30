import { useGetJobsByProfileQuery } from "../redux/api/jobApi";
import { Briefcase, Clock, ArrowRight } from "lucide-react";
import { format } from "timeago.js";

const FreelancerJobsSection = () => {
  const { data, isLoading } = useGetJobsByProfileQuery();

  const jobs = data?.data || [];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Recommended Jobs
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Jobs matched based on your skills & profile
        </p>
      </div>

      {/* LOADING STATE */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* JOB LIST */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >

            {/* TOP ROW */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">

              {/* TITLE + CLIENT */}
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">
                    {job.clientId?.clientName}
                  </span>

                  {job.clientId?.isVerified && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              {/* BUDGET */}
              <div className="text-right">
                <p className="text-sm text-gray-500">Budget</p>
                <p className="text-lg font-bold text-black">
                  NPR {job.budget}
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
              {job.description}
            </p>

            {/* TAGS */}
            <div className="mt-4 flex flex-wrap gap-2">
              {job.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs bg-black text-white px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              {/* META */}
              <div className="flex items-center gap-4 text-xs text-gray-500">

                <span className="flex items-center gap-1">
                  <Briefcase size={14} /> {job.category}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={14} /> Posted {format(job.updatedAt)}
                </span>

              </div>

              {/* ACTION BUTTON */}
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-900 transition">
                View Job
                <ArrowRight size={16} />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {!isLoading && jobs.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No jobs found matching your profile
        </div>
      )}
    </div>
  );
};

export default FreelancerJobsSection;