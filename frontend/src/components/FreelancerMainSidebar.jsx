import { useSelector } from "react-redux";
import { useMemo } from "react";
import { CheckCircle2, AlertCircle, Plus, User, Briefcase, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FreelancerMainSidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const profile = user?.profile || {};

  /**
   * Profile completion logic (simple + practical)
   */
  const completion = useMemo(() => {
    const fields = [
      profile?.profileImage,
      profile?.freelancerName,
      profile?.professionalTitle,
      profile?.bio,
      profile?.skills?.length,
      profile?.category?.length,
      profile?.experience?.length,
    ];

    const filled = fields.filter(Boolean).length;
    const total = fields.length;

    return Math.round((filled / total) * 100);
  }, [profile]);

  /**
   * Missing fields detection
   */
  const missingItems = useMemo(() => {
    const items = [];

    if (!profile?.profileImage) items.push("Upload profile image");
    if (!profile?.freelancerName) items.push("Add your name");
    if (!profile?.professionalTitle) items.push("Add professional title");
    if (!profile?.bio) items.push("Write a short bio");
    if (!profile?.skills?.length) items.push("Add skills");
    if (!profile?.category?.length) items.push("Select categories");
    if (!profile?.experience?.length) items.push("Add experience");

    return items;
  }, [profile]);

  return (
    <div className="space-y-5">

      {/* ================= PROFILE COMPLETION ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Profile Strength
          </h2>
          <span className="text-xs font-medium text-gray-500">
            {completion}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-3">
          A complete profile gets 3x more job invites.
        </p>

        {completion === 100 ? (
          <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle2 size={16} />
            Profile completed
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm">
            <AlertCircle size={16} />
            Improve your profile to get more jobs
          </div>
        )}
      </div>

      {/* ================= MISSING TASKS ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Complete your profile
        </h2>

        <div className="space-y-2">
          {missingItems.length === 0 ? (
            <p className="text-sm text-green-600 flex items-center gap-2">
              <CheckCircle2 size={16} />
              Everything is set up
            </p>
          ) : (
            missingItems.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg"
              >
                <span>{item}</span>
                <Plus size={14} className="text-gray-400" />
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => navigate("/freelancer/profile-setup")}
          className="w-full mt-4 bg-black text-white text-sm py-2 rounded-xl hover:bg-gray-900 transition"
        >
          Complete Profile
        </button>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Quick Actions
        </h2>

        <div className="space-y-2">

          <button
            onClick={() => navigate("/freelancer/profile-setup")}
            className="w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <User size={16} />
            Edit Profile
          </button>

          <button
            className="w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <Briefcase size={16} />
            View Applications
          </button>

          <button
            className="w-full flex items-center gap-2 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            <BookOpen size={16} />
            Improve Skills
          </button>

        </div>
      </div>

      {/* ================= TIPS CARD ================= */}
      <div className="bg-black text-white rounded-2xl p-5 shadow-sm">

        <h2 className="text-sm font-semibold">
          💡 Pro Tip
        </h2>

        <p className="text-xs text-gray-300 mt-2 leading-relaxed">
          Freelancers with complete profiles and 5+ skills get up to 5x more job invites.
        </p>
      </div>

    </div>
  );
};

export default FreelancerMainSidebar;