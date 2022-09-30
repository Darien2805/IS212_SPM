import React,{useState,useEffect} from 'react'
import Axios from 'axios'
// import React from 'react'
import Header from '../components/Header'
import CourseCard from '../components/courseCard';
import "./Courses.css"
function Courses() {
  const [courses,setCourses]=useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:5005/api/getCourses").then((response)=>{
      setCourses(response.data)
    });
    },[])
    
  return (
    <>
    <Header />
    <div className="courseContainer">
      <div >
        <h1>This is courses</h1>
        <div className="child">

            {courses.map((val)=>{
            
              return( val.course_status === "Active" ?
                <CourseCard key={val.course_id} title={val.course_name} description={val.course_desc} /> : "You suck, Ben"
              )
            })}
        </div>
        </div>
    </div>
    </>
  )
}

export default Courses