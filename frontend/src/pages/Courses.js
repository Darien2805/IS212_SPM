import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import CourseCard from '../components/courseCard';
import "./Courses.css"
import TextField from "@mui/material/TextField";

import { getActiveCourses } from '../actions/getCourseApi';

//Bootstrap
import Alert from 'react-bootstrap/Alert';

function Courses() {
  const [activeCourses,setActiveCourses] = useState([]);
  const style = { textAlign: 'center' }
  const staffID = window.localStorage.getItem('sessionId')
  const [query, setQuery] = useState("")
  
  const getData = async() =>{
    const data = await getActiveCourses(staffID)
    setActiveCourses(data.data)
    return data
  }

  useEffect(()=>{
    getData()
    // Axios.get(`http://localhost:5005/api/getActiveCourses/${staff_id}`).then((response)=>{
    //   setActiveCourses(response.data)
    // });
  },[])

  const filterCourses = (course) => {
    return course.course_name.toLowerCase().includes(query.toLowerCase())
  }
    
  return (
    <>
    <Header />
    <div className="courseContainer">
      <div>
        <h1>All courses</h1>
        <div className = "main">
          <div className = "search">
            <TextField id="outlined-basic" variant="outlined" fullwidth label="Search" onChange={event => setQuery(event.target.value)} />
          </div>
        </div>
        <div className="child">
          { activeCourses.length > 0 ? (
            activeCourses.filter(filterCourses).length === 0 ? 
              <p style = {style}>
                <Alert className='alert' key='warning' variant='warning'>
                  No courses match the search input
                </Alert>
              </p>
            :
              activeCourses.filter(filterCourses).map((course) => {
                return(
                  <CourseCard key={course.course_id} courseNames={course.course_name} courseDesc={course.course_desc}
                  skillNames={JSON.parse(course.skill_names)} courseType={course.course_type} courseCompletionStatus={course.completion_status}/> 
                )
              })
          )
            :
            <p style = {style}>
              <Alert className='alert' key='warning' variant='warning'>
                No active courses at the moment
              </Alert>
            </p>
          }
        </div>
      </div>
    </div>
    </>
  )
}
export default Courses