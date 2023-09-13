import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import Iconbtn from '../../commons/Iconbtn';
import CourseTable from './InstructorCourses/CourseTable';

const MyCourses = () => {

    const {token}=useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const [courses,setCourses]=useState([]);


    useEffect(()=>{
        setLoading(true);
        const fetchCourses=async()=>{
            const result=await fetchInstructorCourses(token);
            if(result){
                setLoading(false);
                setCourses(result);
            }
        }
        fetchCourses();
    },[])



  return (
    <div>
        <div className="mb-14 flex items-center justify-between">
            <h1 className="text-3xl font-medium text-coral-pink-400">My Courses</h1>
            <Iconbtn
            text="Add Course"
            onclick={()=>navigate("/dashboard/add-course")}
            >

            </Iconbtn>
        </div>

        {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses