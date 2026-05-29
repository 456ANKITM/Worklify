import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SearchedFreelancers from "./pages/SearchedFreelancers"
import SearchedJobs from "./pages/SearchedJobs"
import FindTalent from "./pages/FindTalent"
import FindWork from "./pages/FindWork"
const App = () => {
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/freelancers/search" element={<SearchedFreelancers />} />
      <Route path="/jobs/search" element={<SearchedJobs />} />
      <Route path="/find-talent" element={<FindTalent />} />
      <Route path="/find-work" element={<FindWork />} />
    </Routes>
  )
}
export default App