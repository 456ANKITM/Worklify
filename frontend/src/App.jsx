import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SearchedFreelancers from "./pages/SearchedFreelancers"
import SearchedJobs from "./pages/SearchedJobs"
const App = () => {
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/freelancers/search" element={<SearchedFreelancers />} />
      <Route path="/jobs/search" element={<SearchedJobs />} />
    </Routes>
  )
}
export default App