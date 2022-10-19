import React,{useState,useEffect } from 'react'
import Select from 'react-select'
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import "./EditSkill.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

function EditSkill(){
    const [currSkillName, setCurrSkillName] = useState('');
    const [newSkillName, setNewSkillName] = useState('');
    const [allSkillName, setAllSkillName] = useState([]);
    const [SkillDesc, setSkillDesc] = useState('');

    const [nameError, setNameError] = useState('');                     // error from new skill name
    const [showNameError, setShowNameError] = useState(false);           // display error from new skill name
    const [descError, setDescError] = useState('');                     // error from new skill description
    const [showDescError, setShowDescError] = useState(false);           // display error from new skill description

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        let allskills=[]
        Axios.get('http://localhost:5005/api/getAllSkills').then((response)=>{
            response.data.forEach(skill =>{
                if(skill.skill_id !== location.state.skillId){
                    allskills.push(skill.skill_name)
                }
            })
        });
        setAllSkillName(allskills)
    },[location.state.roleId])

    useEffect(()=>{
        //console.log(location.state.skillId)
        Axios.get('http://localhost:5005/api/getSkill/'+location.state.skillId).then((response)=>{
            //console.log(response.data[0])
            setCurrSkillName(response.data[0].skill_name)
            setNewSkillName(response.data[0].skill_name)
            setSkillDesc(response.data[0].skill_desc)
        });
    },[location.state.roleId])
    const checkSkillName = (user_input) => {
        setNewSkillName(user_input)
        const same = (element) => element === user_input.toLowerCase();
        if (allSkillName.some(same)){
            setNameError("The skill name already exists in the system.")
            setShowNameError(true)
        }
        else if (user_input.length === 0){
            setNameError("The skill name cannot be left empty.")
            setShowNameError(true)
        }
        else if (user_input.length > 50){
            setNameError("The skill name cannot be more than 50 characters.")
            setShowNameError(true)
        }
        else if (user_input.trim().length === 0){
            setNameError("The skill name cannot be filled with spaces only.")
            setShowNameError(true)
        }
        else{
            setShowNameError(false)
        }
    }

    const checkSkillDesc = (user_input) => {
        setSkillDesc(user_input)
        if (user_input.length === 0){
            setDescError("The skill description cannot be left empty.")
            setShowDescError(true)
        }
        else if (user_input.trim().length === 0){
            setDescError("The skill description cannot be filled with spaces only.")
            setShowDescError(true)
        }
        else if (user_input.length >256){
            setDescError("The skill description cannot be more than 256 characters.")
            setShowDescError(true)
        }
        else{
            setShowDescError(false)
        }
    }

    const updateRole = (e) => {
        e.preventDefault()

        Axios.put('http://localhost:5005/api/updateActiveSkill', {
            skill_id: location.state.skillId, 
            skill_name: newSkillName,
            skill_desc: SkillDesc
        }).then(()=>{
            console.log("successfully insert")
        })

        successAlert(newSkillName, SkillDesc)
    }
    const successAlert = (newSkillName, SkillDesc) => {
        alert("The skill has been updated successfully.\n\nSkill Name: "+newSkillName+"\nRole Description: "+SkillDesc)
        navigate('/SkillMaintenance')
    }

    return (
        <>
        <Header />
        <div className="roleContainer">
            <div >
                <h1>Updating of Skill</h1>
                <div className="child">
                    <div className = "box">
                        <h3 className="skillName">Current Skill: {currSkillName}</h3>

                        <Form>
                            <div>
                                <Form.Group className="mb-3" controlId="Skill">
                                    <Form.Label>Skill</Form.Label>
                                    <Form.Control type="text" placeholder="Skill Name" value={newSkillName} onChange={(e)=>checkSkillName(e.target.value)}/>
                                    { showNameError ? 
                                    <Form.Label className="text-danger">{nameError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="RoleDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Description of Skill" value={SkillDesc} onChange={(e)=>checkSkillDesc(e.target.value)}/>
                                    { showDescError ? 
                                    <Form.Label className="text-danger">{descError}</Form.Label> 
                                    : null }
                                </Form.Group>
                            </div>
                        
                            <div className="text-center">
                                <Button variant="danger" type="button" onClick={()=>navigate('/SkillMaintenance')}>
                                    Cancel
                                </Button>
                                
                                <Button variant="primary" type="submit" onClick={e=>updateRole(e)} disabled={showNameError||showDescError}>
                                    Save
                                </Button>
                            </div>
                            
                        </Form>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default EditSkill