import React from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
              <a
              href="/"
              className="flex items-center gap-2 text-black select-none"
            >
              <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center text-sm font-extrabold">
                W
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Worklify
              </span>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 mt-6">
              A modern freelance marketplace connecting clients with top
              professionals worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaTwitter, link: "#" },
                { icon: FaLinkedin, link: "#" },
                { icon: FaInstagram, link: "#" },
                { icon: FaGithub, link: "#" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.link}
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:bg-black hover:text-white transition"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Freelancer */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
              For Freelancers
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              {["Find Jobs", "Create Profile", "Earnings", "Community"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-black cursor-pointer transition"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Clients */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
              For Clients
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "Post a Job",
                "Browse Talent",
                "Hire Experts",
                "Manage Projects",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-black cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              {[
                "About Us",
                "Careers",
                "Privacy Policy",
                "Terms",
              ].map((item) => (
                <li
                  key={item}
                  className="hover:text-black cursor-pointer transition"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FreelanceHub. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Built for freelancers & clients worldwide
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-sm font-medium hover:underline"
          >
            Back to top
            <ArrowUpRight
              size={16}
              className="group-hover:-translate-y-1 group-hover:translate-x-1 transition"
            />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;