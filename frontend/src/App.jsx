import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SearchedFreelancers from "./pages/SearchedFreelancers"
import SearchedJobs from "./pages/SearchedJobs"
import FindTalent from "./pages/FindTalent"
const App = () => {
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/freelancers/search" element={<SearchedFreelancers />} />
      <Route path="/jobs/search" element={<SearchedJobs />} />
      <Route path="/find-talent" element={<FindTalent />} />
    </Routes>
  )
}
export default App