import { useEffect, useState } from 'react';
import Footer from '../components/commons/Footer';
import {useParams} from 'react-router-dom';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/api';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import { useSelector } from "react-redux";
import CourseCard from '../components/core/catalog/CourseCard';
import CourseSlider from '../components/core/catalog/CourseSlider';
import Error from "./Error"



const Catalog = () => {
    const {catalogName}=useParams();
    const [catalogPageData,setCatalogPageData]=useState(null);
    const [catagoryId,setCatagoryId]=useState("");
    const [active, setActive] = useState(1)
    const { loading } = useSelector((state) => state.profile)

    //fetch all catagory

    useEffect(()=>{
        const getCatagory=async()=>{
            const res= await apiConnector("GET",categories.CATEGORIES_API)
            const catagory_id=res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()=== catalogName)[0]._id;
            setCatagoryId(catagory_id);
        }
        getCatagory()
    },[catalogName])


    useEffect(()=>{
        const getCatagoryDetails=async()=>{
            try {
                const res= await getCatalogPageData(catagoryId);
                console.log("printing res--->",res);
                setCatalogPageData(res); 

            } catch (error) {
                console.log(error);
            }
            
        }
        if(catagoryId) {
            getCatagoryDetails();
        }
    },[catagoryId])

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }
      if (!loading && !catalogPageData.success) {
        return <Error/>
    }

    console.log("category name-->",catalogPageData?.data?.selectCategory?.name);


  return (
    <div>
    {/* Hero Section */}
    <div className=" box-content bg-richblack-800 px-4">
      <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
        <p className="text-sm text-richblack-300">
          {`Home / Catalog / `}
          <span className="text-coral-pink-400">
            {catalogPageData?.data?.selectCategory?.name}
          </span>
        </p>
        <p className="text-3xl text-richblack-5">
          {catalogPageData?.data?.selectCategory?.name}
        </p>
        <p className="max-w-[870px] text-richblack-200">
          {catalogPageData?.data?.selectCategory?.description}
        </p>
      </div>
    </div>

    {/* Section 1 */}
    <div className=" mx-auto box-content w-[90%] max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
      <div className="section_heading">Courses to get you started</div>
      <div className="my-4 flex  text-md">
        <p
          className={`px-4 py-2 ${
            active === 1
              ? "border-b-[4px] border-b-coral-pink-400 text-coral-pink-400"
              : "text-richblack-700"
          } cursor-pointer`}
          onClick={() => setActive(1)}
        >
          Most Populer
        </p>
        <p
          className={`px-4 py-2 ${
            active === 2
              ? "border-b-[4px] border-b-coral-pink-400 text-coral-pink-400"
              : "text-richblack-700"
          } cursor-pointer`}
          onClick={() => setActive(2)}
        >
          New
        </p>
      </div>
      <div>
        <CourseSlider
          Courses={catalogPageData?.data?.selectCategory?.courses}
        />
      </div>
    </div>
    {/* Section 2 */}
    <div className=" mx-auto box-content w-[90%] max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
      <div className="section_heading">
        Top courses in {catalogPageData?.data?.differentCategories?.name}
      </div>
      <div className="py-8">
        <CourseSlider
          Courses={catalogPageData?.data?.differentCategories?.courses}
        />
      </div>
    </div>

    {/* Section 3 */}
    <div className=" mx-auto box-content w-[90%] max-w-maxContentTab px-4 py-12 lg:max-w-maxContent ">
      <div className="section_heading">Frequently Bought</div>
      <div className="py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {catalogPageData?.data?.mostSellingCourses
            ?.slice(0, 4)
            .map((course, i) => (
              <CourseCard course={course} key={i} Height={"h-[250px]"} />
            ))}
        </div>
      </div>
    </div>

    <Footer />
  </div>
  )
}

export default Catalog