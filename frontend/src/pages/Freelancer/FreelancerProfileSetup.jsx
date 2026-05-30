import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useUpdateBasicProfileMutation,
  useAddSkillsMutation,
  useAddCategoryMutation,
} from "../../redux/api/freelancerApi";

const CATEGORIES = [
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

const FreelancerProfileSetup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [updateBasicProfile] = useUpdateBasicProfileMutation();
  const [addCategory] = useAddCategoryMutation();
  const [addSkills] = useAddSkillsMutation();

  const [basic, setBasic] = useState({
    freelancerName: "",
    professionalTitle: "",
    address: "",
    bio: "",
    availability: "available",
  });

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const handleBasicNext = async () => {
    try {
      await updateBasicProfile(basic).unwrap();
      setStep(2);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategoryNext = async () => {
    try {
      if (!selectedCategory || selectedCategory.length === 0) return;

      const payload = {
        category: Array.isArray(selectedCategory)
          ? selectedCategory
          : [selectedCategory],
      };

      await addCategory(payload).unwrap();
      setStep(3);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSkillAdd = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const inputSkills = skillInput
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "");

    if (inputSkills.length === 0) return;

    setSkills((prev) => {
      const uniqueSkills = inputSkills.filter((skill) => !prev.includes(skill));
      return [...prev, ...uniqueSkills];
    });

    setSkillInput("");
  };

  const handleFinish = async () => {
    try {
      let updatedSkills = [...skills];

      if (skillInput.trim()) {
        const remainingSkills = skillInput
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "");

        remainingSkills.forEach((skill) => {
          if (!updatedSkills.includes(skill)) {
            updatedSkills.push(skill);
          }
        });
      }

      if (updatedSkills.length > 0) {
        await addSkills({ skills: updatedSkills }).unwrap();
      }

      navigate("/freelancer/browse-jobs");
    } catch (err) {
      console.log(err);
    }
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">

        {/* CARD WRAPPER */}
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">

          {/* HEADER */}
          <div className="p-6 border-b bg-gradient-to-r from-black to-gray-800 text-white">
            <h1 className="text-2xl font-semibold">Freelancer Setup</h1>
            <p className="text-sm text-gray-300 mt-1">
              Complete your profile to start getting hired
            </p>

            {/* PROGRESS */}
            <div className="mt-4">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs mt-2 text-gray-300">
                Step {step} of 3
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Tell us about yourself</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    This helps clients understand your profile better
                  </p>
                </div>

                <div className="grid gap-4">
                  <input
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Full Name"
                    value={basic.freelancerName}
                    onChange={(e) =>
                      setBasic({ ...basic, freelancerName: e.target.value })
                    }
                  />

                  <input
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Professional Title (e.g. MERN Developer)"
                    value={basic.professionalTitle}
                    onChange={(e) =>
                      setBasic({
                        ...basic,
                        professionalTitle: e.target.value,
                      })
                    }
                  />

                  <input
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Address / Location"
                    value={basic.address}
                    onChange={(e) =>
                      setBasic({ ...basic, address: e.target.value })
                    }
                  />

                  <textarea
                    className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Write a short bio..."
                    rows={4}
                    value={basic.bio}
                    onChange={(e) =>
                      setBasic({ ...basic, bio: e.target.value })
                    }
                  />
                </div>

                <button
                  onClick={handleBasicNext}
                  className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
                >
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Choose your expertise</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Select one or more categories
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory((prev) =>
                          prev.includes(cat)
                            ? prev.filter((c) => c !== cat)
                            : [...prev, cat]
                        );
                      }}
                      className={`p-3 rounded-xl text-sm border transition font-medium ${
                        selectedCategory.includes(cat)
                          ? "bg-black text-white border-black"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="w-1/2 border rounded-xl py-3 hover:bg-gray-50"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleCategoryNext}
                    className="w-1/2 bg-black text-white rounded-xl py-3 hover:bg-gray-900"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Add your skills</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    Press Enter or use commas to add skills
                  </p>
                </div>

                <input
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="e.g. React, Node, MongoDB"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillAdd}
                />

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-black text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() =>
                          setSkills(skills.filter((s) => s !== skill))
                        }
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="w-1/2 border rounded-xl py-3 hover:bg-gray-50"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleFinish}
                    className="w-1/2 bg-black text-white rounded-xl py-3 hover:bg-gray-900"
                  >
                    Finish 🚀
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileSetup;