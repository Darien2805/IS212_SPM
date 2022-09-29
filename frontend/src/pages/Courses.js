import React,{useState,useEffect} from 'react'
import Axios from 'axios'
// import React from 'react'
import Header from '../components/Header'
function Courses() {
  const [courses,setCourses]=useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:5000/api/getCourses").then((response)=>{
      setCourses(response.data)
    });
    },[])
    
  return (
    <>
    <Header />
    <div>This is courses</div>
      <div>
        <table border='1'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Desc</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
          {courses.map((val,key)=>{
            return(
              <tr>
                <td>{val.course_id}</td>
                <td>{val.course_name}</td>
                <td>{val.course_desc}</td>
                <td>{val.course_status}</td>
                <td>{val.course_type}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  )
}

export default Courses