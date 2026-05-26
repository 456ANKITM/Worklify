import CategoriesSection from "../components/CategoriesSection"
import CTABanner from "../components/CTABanner"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import HowItWorks from "../components/HowItWorks"
import PublicNavbar from "../components/PublicNavbar"

const Home = () => {
  return (
    <div>
        <PublicNavbar />
        <HeroSection />
        <CategoriesSection />
        <HowItWorks />
        <CTABanner />
        <Footer />
        </div>
  )
}
export default Home