import React from "react";
import {
  Code2,
  Palette,
  PenTool,
  Megaphone,
  FileText,
  Video,
  ShieldCheck,
  Brain,
  Database,
  Cloud,
  Bug,
  Users,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Software Development", icon: Code2 },
  { title: "UI/UX Design", icon: Palette },
  { title: "Graphic Design", icon: PenTool },
  { title: "Digital Marketing", icon: Megaphone },
  { title: "Content Writing", icon: FileText },
  { title: "Video Editing", icon: Video },
  { title: "Cybersecurity", icon: ShieldCheck },
  { title: "AI and ML", icon: Brain },
  { title: "Data Science", icon: Database },
  { title: "DevOps and Cloud", icon: Cloud },
  { title: "QA and Testing", icon: Bug },
  { title: "Social Media Management", icon: Users },
];

const CategoriesSection = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full bg-white text-black py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            Categories
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            Find Jobs in Your Fields
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore opportunities across multiple industries and connect with
            clients looking for skilled professionals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                onClick={()=>navigate(`/category/${encodeURIComponent(category.title)}`)}
                key={index}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-5 group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <Icon size={22} className="text-black group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Find freelance opportunities in {category.title} and grow your career.
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-black/70 group-hover:text-black transition">
                  Explore Jobs
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;