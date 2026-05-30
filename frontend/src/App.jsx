import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import SearchedFreelancers from "./pages/SearchedFreelancers"
import SearchedJobs from "./pages/SearchedJobs"
import FindTalent from "./pages/FindTalent"
import FindWork from "./pages/FindWork"
import JobsByCategory from "./pages/JobsByCategory"
import ChooseRole from "./pages/ChooseRole"
import FreelancerSignup from "./pages/Freelancer/FreelancerSignup"
import FreelancerLogin from "./pages/Freelancer/FreelancerLogin"
import FreelancerProfileSetup from "./pages/Freelancer/FreelancerProfileSetup"
import { useGetUserQuery } from "./redux/api/authApi"
import { useEffect } from "react"
import { setUser } from "./redux/slices/authSlice"
import { useDispatch } from "react-redux"
import FreelancerMain from "./pages/Freelancer/FreelancerMain"
const App = () => {
  const dispatch = useDispatch();
  const {data, isLoading} = useGetUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(()=>{
    if(data?.user) {
      dispatch(setUser(data.user))
    }
  },[data?.user, dispatch])

  console.log(data)
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/freelancers/search" element={<SearchedFreelancers />} />
      <Route path="/jobs/search" element={<SearchedJobs />} />
      <Route path="/find-talent" element={<FindTalent />} />
      <Route path="/find-work" element={<FindWork />} />
      <Route path="/choose-role" element={<ChooseRole />} />
      <Route path="/freelancer/signup" element={<FreelancerSignup />} />
      <Route path="/freelancer/login" element={<FreelancerLogin />} />
      <Route path="/freelancer/profile-setup" element={<FreelancerProfileSetup />} />
      <Route path="/freelancer/main" element={<FreelancerMain />} />
      <Route path="/category/:category" element={<JobsByCategory />} />
    </Routes>
  )
}
export default App