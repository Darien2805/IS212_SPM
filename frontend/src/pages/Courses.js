import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import CourseCard from '../components/courseCard';
import "./Courses.css"

//Bootstrap
import Alert from 'react-bootstrap/Alert';

function Courses() {
  const [activeCourses,setCourses] = useState([]);
  const staff_id = 2 // Testing purpose

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
                <CourseCard key={course.course_id} courseName={course.course_name} courseDesc={course.course_desc}
                skillNames={JSON.parse(course.skill_names)} courseType={course.course_type}/> 
                : 
                <p>
                  <Alert className='alert' key='warning' variant='warning'>
                    No active courses at the moment
                  </Alert>
                </p>
                
              )
            })}
        </div>
        </div>
    </div>
    </>
  )
}
export default Courses