import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {
    const {token}=useSelector((state)=>state.auth);
    const [enrolledcourses,setEnrolledCourses]=useState(null);
    const navigate = useNavigate();

    const getEnrolledCourses=async()=>{
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (error) {
            console.log("unable to fetch get courses");
        }
    }
    
    useEffect(()=>{
        getEnrolledCourses();
    },[])

  return (
    <div>
        <div className="text-3xl text-coral-pink-400 font-medium">Enrolled Courses </div>
        {
            !enrolledcourses ? 
            (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className='spinner'></div>
            </div>) :
             !enrolledcourses.length ? 
             (<p className="grid h-[10vh] w-full place-content-center font-semibold text-richblack-800">
             You have not enrolled in any course yet</p>):
             (
                <div className="my-8 text-richblack-5 ">
                    <div className="flex rounded-t-lg bg-coral-pink-400 ">
                        <p className="w-[45%] px-5 py-3 text-white">Course Name</p>
                        <p className="w-1/4 px-2 py-3 text-white">Durations</p>
                        <p className="flex-1 px-2 py-3 text-white">Progress</p>
                    </div>
                    {/* card section */}
                    {enrolledcourses.map((course,index,arr)=>(
                        <div key={index} className={`flex items-center border-b-[2px] border-b-richblack-200 lg:border-b-transparent bg-richblack-800 ${
                            index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                        }`}>
                            <div  className="flex w-[45%] cursor-pointer items-center flex-col gap-4 px-5 py-3 md:flex-row "
                            onClick={() => {
                            navigate(
                            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                            )
                            }}
                            >
                                <img src={course.thumbnail} alt='course thumbnail'
                                    className="md:h-14 md:w-14 rounded-lg object-cover w-[300px] h-[100px]"
                                />
                                <div className="flex max-w-xs flex-col gap-2 ">
                                    <p className="font-semibold">{course.courseName.length > 15
                                        ? `${course.courseName.slice(0, 15)}...`
                                        : course.courseName}</p>
                                    <p className="text-xs text-richblack-300">
                                    {course.courseDescription.length > 20
                                        ? `${course.courseDescription.slice(0, 20)}...`
                                        : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 px-2 py-3">
                                {course?.totalDuration}
                            </div>
                            <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                    bgColor='#E97862'
                                />
                            </div>


                        </div>
                    
                    ))
                    }

                </div>
             )
        }
    </div>
  )
}

export default EnrolledCourses