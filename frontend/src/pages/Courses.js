import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import CourseCard from '../components/courseCard';
import "./Courses.css"

function Courses() {
  const [activeCourses,setCourses] = useState([]);
  const staff_id = 2

  useEffect(()=>{
    Axios.get(`http://localhost:5005/api/getActiveCourses/${staff_id}`).then((response)=>{
      setCourses(response.data)
    });
    },[])
    
  return (
    <>
    <Header />
    <div className="courseContainer">
      <div >
        <h1>All courses</h1>
        <div className="child">
            {activeCourses.map((course)=>{
              return(course.course_status === "Active" ?
                <CourseCard key={course.course_id} courseName={course.course_name} courseDesc={course.course_desc}/> 
                : "You suck, Ben"
              )
            })}
        </div>
        </div>
    </div>
    </>
  )
}

export default Courses