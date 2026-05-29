import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SearchedFreelancers from "./pages/SearchedFreelancers"
import SearchedJobs from "./pages/SearchedJobs"
import FindTalent from "./pages/FindTalent"
import FindWork from "./pages/FindWork"
import JobsByCategory from "./pages/JobsByCategory"
import ChooseRole from "./pages/ChooseRole"
import FreelancerSignup from "./pages/Freelancer/FreelancerSignup"
const App = () => {
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/freelancers/search" element={<SearchedFreelancers />} />
      <Route path="/jobs/search" element={<SearchedJobs />} />
      <Route path="/find-talent" element={<FindTalent />} />
      <Route path="/find-work" element={<FindWork />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/freelancer/signup" element={<FreelancerSignup />} />
      <Route path="/category/:category" element={<JobsByCategory />} />

    </Routes>
  )
}
export default App