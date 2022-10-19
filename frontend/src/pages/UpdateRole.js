import React,{useState,useEffect } from 'react'
import Select from 'react-select'
import { useNavigate, useLocation } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import "./UpdateRole.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';

function UpdateRole(){
    const [currRoleName, setCurrRoleName] = useState('');
    const [newRoleName, setNewRoleName] = useState('');
    const [roleDesc, setRoleDesc] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [currRoleNames, setCurrRoleNames] = useState([]);
    const [activeSkills, setActiveSkills] = useState([]);

    const [nameError, setNameError] = useState('');                     // error from new role name
    const [showNameError, setShowNameError] = useState(false);           // display error from new role name
    const [descError, setDescError] = useState('');                     // error from new role description
    const [showDescError, setShowDescError] = useState(false);           // display error from new role description
    const [skillsError, setSkillsError] = useState('');                 // error from skills
    const [showSkillsError, setShowSkillsError] = useState(false);       // display error from skills

    const navigate = useNavigate();
    const location = useLocation();


    useEffect(()=>{
        // set current role name, role desc, skills needed 
        Axios.get(`http://localhost:5005/api/getRole/${location.state.roleId}`).then((response)=>{
            // console.log(response.data[0].role_name)
            setCurrRoleName(response.data[0].role_name)
            setNewRoleName(response.data[0].role_name)
            setRoleDesc(response.data[0].role_desc)

            let skillsSelected = []
            let skillIds = JSON.parse(response.data[0].skill_ids).filter(skillId => {
                return skillId !== null
            })
            let skillNames = JSON.parse(response.data[0].skill_names).filter(skillName => {
                return skillName !== null
            })
            for (let index = 0; index < skillIds.length; index++) {
                let skillId = skillIds[index];
                let skillName = skillNames[index];
                skillsSelected.push({value: skillId, label: skillName})
            }
            setSelectedSkills(skillsSelected)

            if (skillsSelected.length===0){
                setSkillsError(`The skills needed for this role are all not active. Please add new skills needed or go to the "Skill Maintenance" tab to create new skills or recreate deleted skills.`)
                setShowSkillsError(true)
            }
            
        });

        // set current role names (those existing in db)
        Axios.get("http://localhost:5005/api/getAllRoles").then((response)=>{
            let roleNames = []
            response.data.forEach(role => {
                roleNames.push(role.role_name.toLowerCase())
            });            
            setCurrRoleNames(roleNames)
        });

        // set active skills
        Axios.get("http://localhost:5005/api/getActiveSkills").then((response)=>{
            let skills = []
            response.data.forEach(skill => {
                skills.push({value: skill.skill_id, 
                            label: skill.skill_name})
            })
            if (skills.length===0){
                setSkillsError(`There are no active skills at the moment. Please go to the "Skill Maintenance" tab to create new skills or recreate deleted skills.`)
                setShowSkillsError(true)
            }
            else{
                setActiveSkills(skills)
            }
        });

        // set skills error (to show when there's no skills selected)
        setSkillsError("The skills needed cannot be left empty.")
    },[location.state.roleId])

    const checkRoleName = (user_input) => {
        setNewRoleName(user_input)
        if (currRoleNames.includes(user_input.toLowerCase())){
            setNameError("The role name already exists in the system.")
            setShowNameError(true)
        }
        else if (user_input.length === 0){
            setNameError("The role name cannot be left empty.")
            setShowNameError(true)
        }
        else if (user_input.length > 50){
            setNameError("The role name cannot be more than 50 characters.")
            setShowNameError(true)
        }
        else if (user_input.trim().length === 0){
            setNameError("The role name cannot be filled with spaces only.")
            setShowNameError(true)
        }
        else{
            setShowNameError(false)
        }
    }

    const checkRoleDesc = (user_input) => {
        setRoleDesc(user_input)

        if (user_input.length === 0){
            setDescError("The role description cannot be left empty.")
            setShowDescError(true)
        }
        else if (user_input.trim().length === 0){
            setDescError("The role description cannot be filled with spaces only.")
            setShowDescError(true)
        }
        else if (user_input.length >256){
            setDescError("The role description cannot be more than 256 characters.")
            setShowDescError(true)
        }
        else{
            setShowDescError(false)
        }
    }

    const updateRole = (e) => {
        e.preventDefault()

        Axios.put('http://localhost:5005/api/updateActiveRole', {
            role_id: location.state.roleId, 
            role_name: newRoleName,
            role_desc: roleDesc
        }).then(()=>{
            console.log("successfully insert")
        })

        Axios.post('http://localhost:5005/api/recreateRoleSkills', {
            role_id: location.state.roleId, 
            skills: selectedSkills
        }).then(()=>{
            console.log("successfully insert")
        })

        successAlert(newRoleName, roleDesc, selectedSkills)
    }

    const successAlert = (roleName, roleDesc, options) => {
        let skillNames = []
        options.forEach(selectedOption => {
            skillNames.push(selectedOption.label)
        });
        alert("The role has been updated successfully.\n\nRole Name: "+roleName+"\nRole Description: "+roleDesc+"\nSkills Needed: "+skillNames.join(', '))
        navigate('/RoleMaintenance')
    }

    const handleChange = (options) => {
        console.log(selectedSkills)
        setSelectedSkills(options);
        console.log(options)
        if (options.length === 0){
            setShowSkillsError(true)
        }else{
            setShowSkillsError(false)
        }
    };

    return (
        <>
        <Header />
        <div className="roleContainer">
            <div >
                <h1>Updating of Role</h1>
                <div className="child">
                    <div className = "box">
                        <h3 className="roleName">Current Role: {currRoleName}</h3>

                        <Form>
                            <div>
                                <Form.Group className="mb-3" controlId="Role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" placeholder="Role Name" value={newRoleName} onChange={(e)=>checkRoleName(e.target.value)}/>
                                    { showNameError ? 
                                    <Form.Label className="text-danger">{nameError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="RoleDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Description of Role" value={roleDesc} onChange={(e)=>checkRoleDesc(e.target.value)}/>
                                    { showDescError ? 
                                    <Form.Label className="text-danger">{descError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Skills">
                                    <Form.Label>Skills Needed</Form.Label>
                                    <Select isMulti ={true} options={activeSkills} closeMenuOnSelect={false} isSearchable={true} onChange={handleChange} defaultValue={selectedSkills} value={selectedSkills}> 
                                    </Select>
                                    { showSkillsError ? 
                                    <Form.Label className="text-danger">{skillsError}</Form.Label> 
                                    : null }
                                </Form.Group>
                            </div>
                        
                            <div className="text-center">
                                <Button variant="danger" type="button" onClick={()=>navigate('/RoleMaintenance')}>
                                    Cancel
                                </Button>
                                
                                <Button variant="primary" type="submit" onClick={e=>updateRole(e)} disabled={showNameError || showDescError || showSkillsError}>
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
export default UpdateRole