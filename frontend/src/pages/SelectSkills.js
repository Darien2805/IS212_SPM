import React, {useState,useEffect} from 'react'
import axios from 'axios'
import "./SelectSkills.css"
import Select from 'react-select';
//Bootstrap
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
// import ListGroup from 'react-bootstrap/ListGroup';
// import Form from 'react-bootstrap/Form';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Tab from 'react-bootstrap/Tab';

function SelectSkills(props) {
    const [selectedskills, setselectskills] = useState([])      // Skills for current role
    const [courses,setcourses] = useState([])                   // Course name and desc
    const [selectedcourses, setselectedcourses] = useState([])  // Dropdown box selections
    const role_id =2

    useEffect(()=>{        
        const getcourses = (skillid) => {
            let course = []
            axios.get("http://localhost:5005/api/getSkillCourses/" + skillid).then((response)=>
                response.data.forEach(cid => {
                    axios.get("http://localhost:5005/api/getCourse/" + cid.course_id).then((res)=>{
                        res.data.forEach(data => {
                            course.push({
                                value: cid.course_id,
                                label: data['course_name'] + ": " + data['course_desc']
                            });
                        })
                    });
                }
            ));

            return (course)
        }

      axios.get("http://localhost:5005/api/getRoleSkills/" + role_id).then((response)=>{
        setselectskills(response.data);
        // Prepare course selections
        let courseLists = []
        response.data.forEach(skill => {
            courseLists.push(getcourses(skill.skill_id));
        })
        setcourses(courseLists);
        setselectedcourses(new Array(response.data.length).fill(null));
    });
      },[])

    const handleChange = (data, index) => {
        const newArray = selectedcourses.map((v, i) => {
            if (i === index) return data;
            return v;
        });
        setselectedcourses(newArray);
        }

  return (
    <div>
        <h1>Pick a skill for role {role_id}</h1>
        <div className = "selectedskills">
          {selectedskills.map((skills, index)=>
            <div key={index}>
            <label>Skill {skills.skill_id}</label>
            <Select
            options={courses[index]}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={(e)=>handleChange(e, index)}
            allowSelectAll={true}
            value={skills[index]}
            />
            </div>)}
          
           {/* <label>
           <input type="checkbox" value = '' onChange={()=>handleChange(skills.skill_id)}/>Skill {skills.skill_id}</label> */}
          {/* {courses.map((course)=><label><input type="checkbox" />{course.course_id}</label>)} */}

        </div>
        <div>
            <Button variant="outline-primary" type="submit" className="submit">
                <Link to="/learningjourney">Create</Link>
            </Button>
        </div>
      
    </div>
  )
}

SelectSkills.propTypes = {

}

export default SelectSkills


