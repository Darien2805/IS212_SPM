// Tse Hwee is afraid that the e.target value is not the same as skillName because one character is missing. If there are any errors with skill creation do check lines 60-63 on console.log(skillname var and sthe such)

import React,{useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import "./CreateSkill.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

function CreateSkill(){

    const [checked, setChecked] = useState(false);                      // checkbox for previously deleted course
    const [skillName, setSkillName] = useState('');                     // skill name of new skill
    const [skillDesc, setSkillDesc] = useState('');                     // skill description of new skill
    const [currSkillNames, setCurrSkillNames] = useState([]);           // all existing skill names in database
    const [nameError, setNameError] = useState('');                     // error from new skill name
    const [showNameError, setShowNameError] = useState(true);           // display error from new skill name
    const [descError, setDescError] = useState('');                     // error from new skill description
    const [showDescError, setShowDescError] = useState(true);           // display error from new skill description
    const [delSkills, setDelSkills] = useState([]);                     // skill name of new skill
    const [selectedSkillId, setSelectedSkillId] = useState('');         // skill id of recreated skill
    const [selectedSkillDesc, setSelectedSkillDesc] = useState('');     // skill description of recreated skill
    const [delDescError, setDelDescError] = useState('');               // error from recreated skill description
    const [showDelDescError, setShowDelDescError] = useState(false);    // display error from recreated skill description
    const navigate = useNavigate();

    useEffect(()=>{
        // set name and desc errors
        setNameError("The skill name cannot be left empty.")
        setDescError("The skill description cannot be left empty.")
    },[])

    // tbh idk if whether i should just put this chunk in the checkSkillName function
    useEffect(()=>{
        // store all existing skill names
        Axios.get("http://localhost:5005/api/getAllSkills").then((response)=>{
            let skillNames = []
            response.data.forEach(skill => {
                skillNames.push(skill.skill_name.toLowerCase())
            });            
            setCurrSkillNames(skillNames)
            // console.log("hi",currSkillNames)
        });
    },[skillName])

    // tbh idk if whether i should just put this chunk in the updateChecked function
    useEffect(()=>{
        // store all deleted skills
        Axios.get("http://localhost:5005/api/getDeletedSkills").then((response)=>{
            setDelSkills(response.data)
            // console.log("bye",delSkills)
        });
    },[checked])

    const checkSkillName = (e) => {
        console.log('target.value:',e.target.value)
        setSkillName(e.target.value)
        console.log('skillName var:',skillName)
        console.log(currSkillNames.includes(e.target.value.toLowerCase()))
        if (currSkillNames.includes(e.target.value.toLowerCase())){
            setNameError("The skill name already exists in the system.")
            setShowNameError(true)
        }
        else if (e.target.value.length === 0){
            setNameError("The skill name cannot be left empty.")
            setShowNameError(true)
        }
        else if (e.target.value.trim().length === 0){
            setNameError("The skill name cannot be filled with spaces only.")
            setShowNameError(true)
        }
        else{
            setShowNameError(false)
        }
    }

    const checkSkillDesc = (e) => {
        console.log(e.target.value)
        setSkillDesc(e.target.value)
        console.log(skillDesc)

        if (e.target.value.length === 0){
            setDescError("The skill description cannot be left empty.")
            setShowDescError(true)
        }
        else if (e.target.value.trim().length === 0){
            setDescError("The skill description cannot be filled with spaces only.")
            setShowDescError(true)
        }
        // else if (e.target.value.trim().length >256){
        //     setDescError("The skill description cannot be more than 256 characters.")
        //     setShowDescError(true)
        // }
        else{
            setShowDescError(false)
        }
    }

    const createSkill = (e) => {
        Axios.post('http://localhost:5005/api/createSkill', {
            skill_name: skillName, 
            skill_desc: skillDesc
        }).then(()=>{
            alert("successfully insert")
        })
        successAlert(skillName, skillDesc)
    }

    const updateSelectedDelSkill = (skillId) => {
        setSelectedSkillId(skillId)
        delSkills.forEach(skill => {
            if (skill.skill_id === skillId){
                setSelectedSkillDesc(skill.skill_desc)
            }
        });
        console.log(selectedSkillId,selectedSkillDesc)
    }

    const checkDelSkillDesc = (e) => {
        setSelectedSkillDesc(e.target.value)
        if (e.target.value.length === 0){
            setDelDescError("The skill description cannot be left empty.")
            setShowDelDescError(true)
        }
        else if (e.target.value.trim().length === 0){
            setDelDescError("The skill description cannot be filled with spaces only.")
            setShowDelDescError(true)
        }
        else{
            setShowDelDescError(false)
        }
    }

    const recreateSkill = (e) => {
        Axios.post('http://localhost:5005/api/updateDeletedSkill', {
            skill_id: selectedSkillId, 
            skill_desc: selectedSkillDesc
        }).then(()=>{
            alert("successfully insert")
        })

        delSkills.forEach(skill => {
            if (skill.skill_id === selectedSkillId){
                successAlert(skill.skill_name, skill.skill_desc)
            }
        });
        
    }

    const successAlert = (skillName, skillDesc) => {
        alert("The skill has been created successfully.\n\nSkill Name: "+skillName+"\nSkill Description: "+skillDesc)
        navigate('/SkillMaintenance')
    }

    return (
        <>
        <Header />
        <div className="courseContainer">
            <div >
                <h1>Creation of Skills</h1>
                <div className="child">
                    <div className = "box">

                        <Form>

                            <Form.Group className="mb-3" controlId="PrevDeletedSkill">
                                <Form.Check type="checkbox" label="Previously Deleted Skill" onChange={()=>setChecked(!checked)}/>
                            </Form.Group>
                        {   
                            !checked?
                            <div>
                                <Form.Group className="mb-3" controlId="Skill">
                                    <Form.Label>Skill</Form.Label>
                                    <Form.Control type="text" maxLength={20} placeholder="Skill Name" value={skillName} onChange={(e)=>checkSkillName(e)}/>
                                    { showNameError ? 
                                    <Form.Label className="text-danger">{nameError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="SkillDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} maxLength={256} placeholder="Description of Skill" value={skillDesc} onChange={(e)=>checkSkillDesc(e)}/>
                                    { showDescError ? 
                                    <Form.Label className="text-danger">{descError}</Form.Label> 
                                    : null }
                                </Form.Group>
                            </div>
                            :
                            <div>
                                <Form.Group className="mb-3" controlId="Skill">
                                    <Form.Label>Skill</Form.Label>
                                    <Form.Select value={selectedSkillId} onChange={(e) => updateSelectedDelSkill(e.target.value)}>
                                        <option value='' disabled>Select skill</option>
                                        {delSkills.map((delSkill)=>{
                                            return( 
                                                <option key={delSkill.skill_id} value={delSkill.skill_id}>{delSkill.skill_name}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="SkillDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} maxLength={256} placeholder="Description of Skill" value={selectedSkillDesc} onChange={(e)=>checkDelSkillDesc(e)}/>
                                    { showDelDescError ? 
                                    <Form.Label className="text-danger">{delDescError}</Form.Label> 
                                    : null }
                                </Form.Group>
                            </div>
                        }
                            <div className="text-center">
                                <Button variant="danger" type="button" onClick={()=>navigate('/SkillMaintenance')}>
                                    Cancel
                                </Button>
                                {
                                !checked?
                                <Button variant="primary" type="submit" onClick={e=>createSkill(e)} disabled={showNameError || showDescError}>
                                    Submit
                                </Button>
                                :
                                <Button variant="primary" type="submit" onClick={e=>recreateSkill(e)} disabled={selectedSkillId===''} >
                                    Submit 
                                </Button>
                                }
                            </div>
                            
                        </Form>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default CreateSkill