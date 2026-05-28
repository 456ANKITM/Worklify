import { useSearchParams } from "react-router-dom"
import Footer from "../components/Footer"
import PublicNavbar from "../components/PublicNavbar"
import { useSearchFreelancerQuery } from "../redux/api/freelancerApi";

const SearchedFreelancers = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const {data, isLoading, isError} = useSearchFreelancerQuery(query,{
        skip: !query
    });

    console.log(data)
  return (
    <>
        <PublicNavbar />
        <Footer />
        </>
  )
}
export default SearchedFreelancers