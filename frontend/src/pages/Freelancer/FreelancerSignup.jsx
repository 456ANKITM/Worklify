import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../../components/PublicNavbar";
import Footer from "../../components/Footer";

import {
  Phone,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import { useSignupFreelancerMutation } from "../../redux/api/authApi";
import Success from "../../components/Success";
import Error from "../../components/Error";

const FreelancerSignup = () => {
  const navigate = useNavigate();

  const [signupFreelancer, { isLoading }] =
    useSignupFreelancerMutation();

  const [form, setForm] = useState({
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSuccess("");

  try {
    const res = await signupFreelancer({
      ...form,
      role: "freelancer",
    }).unwrap();

    console.log("Signup Success:", res);

    if (res.success) {
      setSuccess(res.message);

      setTimeout(() => {
        navigate("/freelancer/login");
      }, 1500);
    }
  } catch (err) {
    setError(
      err?.data?.message ||
        "User signup failed due to some issue"
    );
  }
};

  return (
    <>
      <PublicNavbar />
      {success && (
  <Success
    title="Signup Successful"
    message={success}
  />
)}

{error && (
  <Error
    title="Signup Failed"
    message={error}
  />
)}

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 border border-black px-5 py-2 rounded-full mb-5">
              <Sparkles size={18} />
              <span className="text-sm font-medium">
                Freelancer Signup
              </span>
            </div>

            <h1 className="text-4xl font-black text-black">
              Join as Freelancer
            </h1>

            <p className="text-gray-500 mt-3">
              Start earning by offering your skills to clients
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 rounded-3xl p-8 bg-white shadow-sm space-y-6"
          >
            {/* PHONE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-3 py-3 focus-within:border-black transition">
                <Phone size={18} className="text-gray-500" />

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full outline-none ml-3"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-3 py-3 focus-within:border-black transition">
                <Lock size={18} className="text-gray-500" />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full outline-none ml-3"
                  required
                />
              </div>
            </div>

           

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition disabled:opacity-60"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* FOOTNOTE */}
          <p className="text-center text-gray-400 text-sm mt-6">
            By continuing, you agree to our terms & conditions
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FreelancerSignup;