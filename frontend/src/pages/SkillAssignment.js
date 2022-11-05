
import React,{useState,useEffect} from 'react'
import Select from 'react-select'
import Header from '../components/Header'
import "./SkillAssignment.css"
//Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ListGroupItem } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Tab from 'react-bootstrap/Tab';

//Axios
import Axios from 'axios'

function SkillAssignment() {

    //const [courseIDToggle, toggleSelection] = useState('');
    const [courseObjects, setCourseObjects] = useState([]);
    const [courseObject, setCourseObject] = useState('');
    const [skills, setAllSkills] = useState([]);
    const [selectedCourseId, setselectedCourseId] = useState(''); 
    const [skill, setSkill] = useState('');

    // const [selectedCourseName, setselectedCourseName] = useState(''); 
    // const [selectedCourseDesc, setselectedCourseDesc] = useState(''); 
    // const [selectedCourseStatus, setselectedCourseStatus] = useState(''); 
    // const [selectedCourseType, setselectedCourseType] = useState(''); 

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showAssignError, setShowAssignError] = useState(true);   
    const [assignError, setAssignError] = useState('');   
    const [staffId, setStaffId] = useState('')  


    class courseObj {
        constructor(id, name, desc, status, type, skills) {
            this.id = id;
            this.name = name;
            this.desc = desc;
            this.status = status;
            this.type = type;
            this.skills = skills
        }
    }

    useEffect(()=>{
        // set name and desc errors
        setAssignError("Please assign new skills or delete skills")
    },[])

    useEffect(()=>{
        // store all existing course as objects
        
        setStaffId(window.localStorage.getItem('sessionId'))
        //console.log(staffId)
        Axios.get("http://localhost:5005/api/getActiveCourses/"+1).then((response)=>{
        let course_Objects = []
        
        response.data.forEach(course => {
            let skills = retrieveSkills(course.course_id)
            //console.log(skills)
            let courseObject = new courseObj(course.course_id, course.course_name, course.course_desc, course.course_status, course.course_type, skills)
            course_Objects.push(courseObject)
        });            
        setCourseObjects(course_Objects) 
        //console.log(course_Objects)
    });
        
    },[courseObject])

    useEffect(()=>{
        // store all existing course as objects
        Axios.get("http://localhost:5005/api/getActiveSkills").then((response)=>{
            let all_skills = []
            
            response.data.forEach(skills => {
                all_skills.push({
                    value: skills.skill_id,
                    label: skills.skill_name})
            });            
            setAllSkills(all_skills) 
            //console.log('skills', all_skills)

        });
    },[skill])



    function retrieveSkills(course_id){
        var skills = []
        Axios.get("http://localhost:5005/api/getCourseSkill/"+course_id).then((response)=>{
            response.data.forEach(courseSkill => {
                skills.push({
                    value: courseSkill.skill_id,
                    label: courseSkill.skill_name})
            });
            //console.log(course_id, skills)      
        });
        //console.log(course_id, skills) 
        return (skills)
    }


    const handleChange = (options) => {
        setSelectedOptions(options);
        if (options.length == 0){
            setAssignError("Assigning of skills cannot be empty")
            setShowAssignError(true)
        }else{
            setShowAssignError(false)
        }
        
    };
    //console.log(selectedOptions)

    const AssignSkill = (e) => {
        let newSkills = []
        for (let i = 0; i < selectedOptions.length; i++) {
            newSkills.push(selectedOptions[i].value)
            //console.log(selectedOptions[i].value)
        } 
        Axios.post('http://localhost:5005/api/createCourseSkills', {
            course_id: selectedCourseId, 
            skills: newSkills
        }).then(()=>{
            alert("new skills inserted")
        })
        successAlert(selectedCourseId)
    }

    const successAlert = (course_id) => {
        alert("Course " + course_id + " has been successfully assigned")
    }


    return (
        <>
        <Header />
        <div>
            <Row className = "m-4">
                <h1>Skill Assignment</h1>
            </Row>
            
            <Row className="mt-5">
                <Tab.Container>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={3} className = "m-0 p-0 listbox">
                            <ListGroup>
                                {courseObjects.map(courseO => (
                                    <ListGroup.Item action key={courseO.id} href={"#"+ courseO.id} variant="secondary" onClick={()=>setselectedCourseId(courseO.id)}>
                                        {courseO.name}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Col>

                        <Col sm={5} className="tabbox">
                            
                            <Tab.Content>
                                {courseObjects.map(courseDisplay => (
                                    <Tab.Pane key={courseDisplay.id} eventKey={"#"+ courseDisplay.id}>
                                        <div className="p-3">

                                            <h4 className="pb-2 courseName">{courseDisplay.name} ({courseDisplay.id})</h4>
                                            <h5 className='descriptionTitle'>Description</h5>
                                            <p className='description'>
                                                {courseDisplay.desc}
                                            </p>
                                            <h6 style={{display:"inline"}}>Course Type: </h6>
                                            {courseDisplay.type}

                                            <br></br><br></br>

                                            <h6>Skills Needed</h6>
                                            
                                            <div>
                                                <Select 
                                                isMulti ={true}
                                                options={skills} 
                                                closeMenuOnSelect={false} 
                                                isSearchable={true} 
                                                onChange={handleChange} 
                                                defaultValue={courseDisplay.skills}>
                                                    
                                                </Select>
                                            </div>

                                            { showAssignError ? 
                                            <Form.Label className="text-danger">{assignError}</Form.Label> 
                                            : null }

                                            <Button variant="primary" type="submit" className="submit" onClick={e=>AssignSkill(e)} disabled={showAssignError}>
                                                Submit
                                            </Button>
                                        </div>
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>

                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                </Tab.Container>
            </Row>
        </div>

        

        </>
  )
}

export default SkillAssignment