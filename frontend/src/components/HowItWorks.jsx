import React from "react";
import {
  BriefcaseBusiness,
  Search,
  Send,
  FileCheck,
  PlayCircle,
  CheckCircle2,
  Wallet,
  UserPlus,
  ShieldCheck,
  BadgeCheck,
  Lock,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";

const freelancerSteps = [
  {
    title: "Browse Jobs",
    icon: Search,
  },
  {
    title: "Apply for the Job",
    icon: Send,
  },
  {
    title: "Get Contract",
    icon: FileCheck,
  },
  {
    title: "Start Working",
    icon: PlayCircle,
  },
  {
    title: "Complete Work",
    icon: CheckCircle2,
  },
  {
    title: "Get Paid",
    icon: Wallet,
  },
];

const clientSteps = [
  {
    title: "Post a Job",
    icon: BriefcaseBusiness,
  },
  {
    title: "Approve Proposal",
    icon: BadgeCheck,
  },
  {
    title: "Contract Created",
    icon: FileCheck,
  },
  {
    title: "Funds to Escrow",
    icon: Lock,
  },
  {
    title: "Work Completed",
    icon: ShieldCheck,
  },
  {
    title: "Payment Released",
    icon: CircleDollarSign,
  },
];

const WorkflowCard = ({ title, steps, badge }) => {
  return (
    <div className="relative rounded-3xl border border-gray-200 bg-white p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
      {/* Top */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
            Workflow
          </p>

          <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
        </div>

        <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white text-sm font-semibold">
          {badge}
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={index}
              className="group flex items-center gap-4 rounded-2xl border border-gray-200 p-4 hover:border-black hover:bg-black transition-all duration-300"
            >
              {/* Number */}
              <div className="min-w-[42px] h-[42px] rounded-xl bg-gray-100 flex items-center justify-center text-sm font-semibold group-hover:bg-white transition">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-white transition-all">
                <Icon
                  size={20}
                  className="text-black"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h4 className="text-sm md:text-base font-medium text-black group-hover:text-white transition">
                  {step.title}
                </h4>
              </div>

              {/* Arrow */}
              {index !== steps.length - 1 && (
                <ArrowRight
                  size={18}
                  className="text-gray-400 group-hover:text-white transition hidden sm:block"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="w-full bg-white text-black py-24 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            How It Works
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Built for Clients & Freelancers
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            A smooth workflow designed to help freelancers find opportunities
            and clients hire top talent with secure contracts and payments.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <WorkflowCard
            title="For Freelancers"
            steps={freelancerSteps}
            badge="01"
          />

          <WorkflowCard
            title="For Clients"
            steps={clientSteps}
            badge="02"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;