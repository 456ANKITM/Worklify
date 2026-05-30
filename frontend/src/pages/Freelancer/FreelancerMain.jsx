import FreelancerNavbar from "../../components/FreelancerNavbar";
import FreelancerJobsSection from "../../components/FreelancerJobsSection";
import FreelancerMainSidebar from "../../components/FreelancerMainSidebar";
import Footer from "../../components/Footer";

const FreelancerMain = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <FreelancerNavbar />

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ================= LEFT SECTION (70%) ================= */}
          <div className="w-full lg:w-[70%] space-y-6">
            <FreelancerJobsSection />
          </div>

          {/* ================= RIGHT SIDEBAR (30%) ================= */}
          <div className="hidden lg:block lg:w-[30%]">
            <div className="sticky top-20 space-y-6">
              <FreelancerMainSidebar />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FreelancerMain;