import React, {useState,useEffect} from 'react'
import axios from 'axios'
import "./SelectSkills.css"
import PropTypes from 'prop-types'

function SelectSkills2(props) {
    const [selectedskills, setselectskills] = useState([])
    const [skill,setskills] = useState(Number)
    const [courses, setcourses] = useState(skill)
    const role_id =2
    const [coursename, setcoursename] = useState([])

    const handleChange = (data) => {
        setskills(data)
      }
    useEffect(()=>{
      axios.get("http://localhost:5005/api/getRoleSkills/" + role_id).then((response)=>
        setselectskills(response.data)
      );
      },[])

    console.log(skill)

    function getcourses(){
          axios.get("http://localhost:5005/api/getSkillCourses/" + skill).then((response)=>
            response.data.forEach(cid => {setcourses(cid.course_id)})
          );

          return (courses)
        }

  // useEffect(()=>{
  //   axios.get("http://localhost:5005/api/getCourse/:course_id").then((response)=>{
  //     let name = response.data.map((coursesname)=>coursesname['course_name'])
  //     let desc = response.data.map((cdesc)=>cdesc['course_desc'])
  //     setcoursename(name,desc)
  //   });
  //   },[])



  return (
    <div>
        <h1>Pick a skill for role {role_id}</h1>
        <div className = "selectedskills">

          {selectedskills.map((skills)=><label>
          <input type="checkbox" value = {skills.skill_id} onChange={()=>handleChange(skills.skill_id)}/>Skill {skills.skill_id}</label>)}

        </div>
      
    </div>
  )
}

SelectSkills2.propTypes = {

}

export default SelectSkills2



