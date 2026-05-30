import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PublicNavbar from "../../components/PublicNavbar";
import Footer from "../../components/Footer";

import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";

import { useLoginMutation } from "../../redux/api/authApi";
import Success from "../../components/Success";
import Error from "../../components/Error";

const FreelancerLogin = () => {
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    email: "",
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
      const res = await login(form).unwrap();

      console.log("Login Success:", res);

      if (res.success) {
        setSuccess(res.message);
        const user = res.user;

        setTimeout(() => {


          if(user.role === "freelancer") {
            if(!user.profileCompleted) {
                navigate("/freelancer/profile-setup")
            } else {
                navigate("/freealancer/browse-jobs")
            }
          }

          if(user.role === "client") {
            if(!user.profileCompleted) {
                navigate("/client/profile-setup")
            } else {
                navigate("/client/dashboard")
            }
          }


        }, 1200);
      }
    } catch (err) {
      setError(
        err?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <PublicNavbar />

      {success && (
        <Success title="Login Successful" message={success} />
      )}

      {error && (
        <Error title="Login Failed" message={error} />
      )}

      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 border border-black px-5 py-2 rounded-full mb-5">
              <Sparkles size={18} />
              <span className="text-sm font-medium">
                Welcome Back
              </span>
            </div>

            <h1 className="text-4xl font-black text-black">
              Login to Your Account
            </h1>

            <p className="text-gray-500 mt-3">
              Continue your freelancing journey
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="border border-gray-200 rounded-3xl p-8 bg-white shadow-sm space-y-6"
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>

              <div className="mt-2 flex items-center border border-gray-300 rounded-xl px-3 py-3 focus-within:border-black transition">
                <Mail size={18} className="text-gray-500" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
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
                  placeholder="Enter your password"
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
              {isLoading ? "Logging in..." : "Login"}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* FOOTNOTE */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account? Sign up to get started.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FreelancerLogin;