import Footer from "../components/Footer";
import PublicNavbar from "../components/PublicNavbar";
import { useSearchParams } from "react-router-dom";
import { useSearchFreelancerQuery } from "../redux/api/freelancerApi";
import { MapPin, Star, BadgeCheck } from "lucide-react";

const SearchedFreelancers = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data, isLoading, isError } = useSearchFreelancerQuery(query, {
    skip: !query,
  });

  const freelancers = data?.freelancers || [];

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-black">
              Freelancer Marketplace
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              {query
                ? `Results for "${query}"`
                : "Browse top freelancers"}
            </p>
          </div>

          {/* States */}
          {isLoading && (
            <p className="text-zinc-500">Loading freelancers...</p>
          )}

          {isError && (
            <p className="text-red-500">Failed to load data</p>
          )}

          {/* Cards */}
          <div className="space-y-5">
            {freelancers.map((f) => (
              <div
                key={f._id}
                className="group border border-zinc-200 rounded-2xl p-6 bg-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >

                <div className="flex gap-5">

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {f.profileImage ? (
                      <img
                        src={f.profileImage}
                        alt={f.freelancerName}
                        className="w-14 h-14 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center text-lg font-semibold text-zinc-700">
                        {f.freelancerName?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">

                    {/* Name + Verified */}
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-black">
                        {f.freelancerName}
                      </h2>

                      {f.isVerified && (
                        <BadgeCheck
                          size={16}
                          className="text-black"
                        />
                      )}
                    </div>

                    {/* Title */}
                    <p className="text-sm text-zinc-600">
                      {f.professionalTitle}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-zinc-500 mt-1">
                      <MapPin size={14} />
                      {f.address}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-zinc-700 mt-3 line-clamp-2">
                      {f.bio}
                    </p>

                    {/* Skills (always show even if empty placeholder) */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {f.skills?.length > 0 ? (
                        f.skills.map((skill, i) => (
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

                    {/* Category */}
                    {f.category?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {f.category.map((cat, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-black text-white"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between">

                      {/* Rating */}
                      <div className="flex items-center gap-1 text-sm text-zinc-700">
                        <Star size={14} className="text-black" />
                        {f.averageRating || 0}
                      </div>

                      {/* Availability */}
                      <span
                        className={`text-xs px-3 py-1 rounded-full ${
                          f.availability === "available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {f.availability}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {!isLoading && freelancers.length === 0 && (
            <div className="text-center text-zinc-500 mt-20">
              No freelancers found
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchedFreelancers;