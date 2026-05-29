import Footer from "../components/Footer";
import PublicNavbar from "../components/PublicNavbar";
import { useGetTopFreelancersQuery } from "../redux/api/freelancerApi";
import {
  Briefcase,
  Code2,
  Palette,
  PenSquare,
  ShieldCheck,
  Brain,
  Database,
  Cloud,
  Bug,
  Share2,
  Video,
  Megaphone,
  Star,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const categoryIcons = {
  "Software Development": <Code2 size={22} />,
  "UI/UX Design": <Palette size={22} />,
  "Graphic Design": <Palette size={22} />,
  "Digital Marketing": <Megaphone size={22} />,
  "Content Writing": <PenSquare size={22} />,
  "Video Editing": <Video size={22} />,
  Cybersecurity: <ShieldCheck size={22} />,
  "AI and ML": <Brain size={22} />,
  "Data Science": <Database size={22} />,
  "DevOps and Cloud": <Cloud size={22} />,
  "QA and Testing": <Bug size={22} />,
  "Social Media Management": <Share2 size={22} />,
};

const categories = [
  "Software Development",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Content Writing",
  "Video Editing",
  "Cybersecurity",
  "AI and ML",
  "Data Science",
  "DevOps and Cloud",
  "QA and Testing",
  "Social Media Management",
];

const FindTalent = () => {
  const { data, isLoading } = useGetTopFreelancersQuery();

  const freelancersByCategory = data?.data || {};

  if (isLoading) {
    return (
      <>
        <PublicNavbar />

        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full border-4 border-black border-t-transparent animate-spin"></div>
            <p className="text-lg font-semibold text-black">
              Loading Top Freelancers...
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
              <Briefcase size={18} />
              <span className="font-medium text-sm">
                Discover Nepal’s Top Freelancers
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black leading-tight max-w-5xl mx-auto">
              Hire Skilled Freelancers For Your Next Big Project
            </h1>

            <p className="mt-6 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
              Explore highly rated freelancers across software development,
              design, AI, marketing, cybersecurity and more. Find the perfect
              talent for your business with confidence.
            </p>

            
          </div>
        </section>

        {/* CATEGORY SECTIONS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
          {categories.map((category) => {
            const freelancers = freelancersByCategory[category] || [];

            return (
              <div key={category}>
                {/* CATEGORY HEADER */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center">
                        {categoryIcons[category]}
                      </div>

                      <div>
                        <h2 className="text-2xl sm:text-3xl font-black text-black">
                          {category}
                        </h2>

                        <p className="text-gray-500 mt-1">
                          Top rated freelancers in this category
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="border border-black px-5 py-2 rounded-lg font-medium hover:bg-black hover:text-white transition-all duration-300">
                    View All
                  </button>
                </div>

                {/* FREELANCERS GRID */}
                {freelancers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {freelancers.slice(0, 8).map((freelancer) => (
                      <div
                        key={freelancer._id}
                        className="group border border-gray-200 rounded-3xl p-5 hover:border-black hover:-translate-y-2 transition-all duration-300 bg-white hover:shadow-2xl"
                      >
                        {/* TOP */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                freelancer?.profileImage ||
                                "https://ui-avatars.com/api/?name=Freelancer"
                              }
                              alt="freelancer"
                              className="w-16 h-16 rounded-2xl object-cover border"
                            />

                            <div>
                              <h3 className="font-bold text-lg text-black line-clamp-1">
                                {freelancer?.fullName || "Freelancer"}
                              </h3>

                              <p className="text-sm text-gray-500 line-clamp-1">
                                {freelancer?.headline ||
                                  category + " Expert"}
                              </p>
                            </div>
                          </div>

                          <CheckCircle2
                            size={20}
                            className="text-green-600"
                          />
                        </div>

                        {/* DESCRIPTION */}
                        <p className="mt-5 text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[70px]">
                          {freelancer?.bio ||
                            "Experienced freelancer delivering quality work with professionalism and strong communication."}
                        </p>

                        {/* SKILLS */}
                        <div className="flex flex-wrap gap-2 mt-5">
                          {freelancer?.skills
                            ?.slice(0, 3)
                            .map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-black"
                              >
                                {skill}
                              </span>
                            ))}
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <h4 className="font-black text-lg">
                              {freelancer?.rating || "5.0"}
                            </h4>

                            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                              <Star size={12} />
                              Rating
                            </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <h4 className="font-black text-lg">
                              {freelancer?.totalJobs || 0}
                            </h4>

                            <p className="text-xs text-gray-500">
                              Jobs Done
                            </p>
                          </div>

                          <div className="bg-gray-50 rounded-xl p-3 text-center">
                            <h4 className="font-black text-lg">
                              {freelancer?.profileCompletion || 90}%
                            </h4>

                            <p className="text-xs text-gray-500">Profile</p>
                          </div>
                        </div>

                        {/* FOOTER */}
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin size={15} />
                            <span>
                              {freelancer?.location || "Nepal"}
                            </span>
                          </div>

                          <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all duration-300">
                            View Profile
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-3xl p-12 text-center">
                    <h3 className="text-2xl font-bold text-black">
                      No Freelancers Found
                    </h3>

                    <p className="text-gray-500 mt-3">
                      Freelancers for this category will appear here.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default FindTalent;