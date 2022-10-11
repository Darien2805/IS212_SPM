import React,{useState,useEffect } from 'react'
import Select from 'react-select'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import "./CreateRole.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';

function CreateRole(){
    const [checked, setChecked] = useState(false);                      // checkbox for previously deleted course

    const [roleName, setRoleName] = useState('');                       // role name of new role
    const [roleDesc, setRoleDesc] = useState('');                       // role description of new role
    const [currRoleNames, setCurrRoleNames] = useState([]);             // all existing role names in database
    const [activeSkills, setActiveSkills] = useState([])                // active skills available for assignment
    const [selectedOptions, setSelectedOptions] = useState([]);         // options selected for skill assignment
    const [nameError, setNameError] = useState('');                     // error from new role name
    const [showNameError, setShowNameError] = useState(true);           // display error from new role name
    const [descError, setDescError] = useState('');                     // error from new role description
    const [showDescError, setShowDescError] = useState(true);           // display error from new role description
    const [skillsError, setSkillsError] = useState('');                 // error from skills
    const [showSkillsError, setShowSkillsError] = useState(true);       // display error from skills
    const [roleID, setRoleID] = useState('');                           // role ID of created skill

    const [delRoles, setDelRoles] = useState([]);                       // all deleted roles
    const [selectedRoleId, setSelectedRoleId] = useState('');           // role id of recreated role
    const [selectedRoleDesc, setSelectedRoleDesc] = useState('');       // role description of recreated role
    const [pastSelectedSkills, setPastSelectedSkills] = useState([]);           // options selected for skill assignment
    const [delDescError, setDelDescError] = useState('');               // error from recreated role description
    const [showDelDescError, setShowDelDescError] = useState(false);        // display error from recreated role description
    const [delSkillsError, setDelSkillsError] = useState('');               // error from skills
    const [showDelSkillsError, setShowDelSkillsError] = useState(false);    // display error from skills
    const navigate = useNavigate();



    useEffect(()=>{
        // set name and desc errors
        setNameError("The role name cannot be left empty.")
        setDescError("The role description cannot be left empty.")
        setSkillsError("The skills needed cannot be left empty.")
        setDelSkillsError("The skills needed cannot be left empty.")
    },[])

    useEffect(()=>{
        // store all existing role names
        Axios.get("http://localhost:5005/api/getAllRoles").then((response)=>{
            let roleNames = []
            response.data.forEach(role => {
                roleNames.push(role.role_name.toLowerCase())
            });            
            setCurrRoleNames(roleNames)
        });
    },[roleName])

    useEffect(()=>{
        // store all skills (id and name only)
        Axios.get("http://localhost:5005/api/getActiveSkills").then((response)=>{
            let skills = []
            response.data.forEach(skill => {
                skills.push({value: skill.skill_id, 
                            label: skill.skill_name})
            })
            setActiveSkills(skills)
        });

        // store all deleted roles
        Axios.get("http://localhost:5005/api/getDeletedRoles").then((response)=>{
            var deletedRoles = []
            response.data.forEach(role => {
                let skills = retrieveSkills(role.role_id)
                deletedRoles.push({role_id: role.role_id, role_name: role.role_name, role_desc: role.role_desc, role_status: role.role_status, skills: skills})
            });

            setDelRoles(deletedRoles)
            // console.log("bye",delRoles)
        });
    },[checked, selectedRoleId])

    useEffect(()=>{
        if (roleID!==''){
            console.log("testing use effect")

            // create role skills
            Axios.post('http://localhost:5005/api/createRoleSkills', {
                role_id: roleID, 
                skills: selectedOptions
            }).then(()=>{
                alert("successfully insert")
            })
            successAlert(roleName, roleDesc, selectedOptions, "created")
        }
    },[roleID])

    const checkRoleName = (user_input) => {
        setRoleName(user_input)
        if (currRoleNames.includes(user_input.toLowerCase())){
            setNameError("The role name already exists in the system.")
            setShowNameError(true)
        }
        else if (user_input.length === 0){
            setNameError("The role name cannot be left empty.")
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
        // else if (user_input.trim().length >256){
        //     setDescError("The role description cannot be more than 256 characters.")
        //     setShowDescError(true)
        // }
        else{
            setShowDescError(false)
        }
    }

    const createRole = async (e) => {
        e.preventDefault()
        // create role and get/set role id
        await Axios.post('http://localhost:5005/api/createRole', {
            role_name: roleName, 
            role_desc: roleDesc
        }).then((resp)=>{
            console.log(resp)
            setRoleID(resp.data[0].role_id)
            console.log(roleID)
        })
    }

    const updateSelectedDelRole = (roleId) => {
        setSelectedRoleId(roleId)
        delRoles.forEach(role => {
            if (role.role_id == roleId){
                setSelectedRoleDesc(role.role_desc)
                setPastSelectedSkills(role.skills)
            }
        })
    }

    const checkDelRoleDesc = (e) => {
        setSelectedRoleDesc(e.target.value)
        if (e.target.value.length === 0){
            setDelDescError("The role description cannot be left empty.")
            setShowDelDescError(true)
        }
        else if (e.target.value.trim().length === 0){
            setDelDescError("The role description cannot be filled with spaces only.")
            setShowDelDescError(true)
        }
        else{
            setShowDelDescError(false)
        }
    }

    const recreateRole = (e) => {
        e.preventDefault()

        Axios.post('http://localhost:5005/api/updateDeletedRole', {
            role_id: selectedRoleId, 
            role_desc: selectedRoleDesc
        }).then(()=>{
            console.log("successfully insert")
        })

        Axios.post('http://localhost:5005/api/recreateRoleSkills', {
            role_id: selectedRoleId, 
            skills: pastSelectedSkills
        }).then(()=>{
            console.log("successfully insert")
        })

        delRoles.forEach(role => {
            if (role.role_id == selectedRoleId){
                successAlert(role.role_name, selectedRoleDesc, pastSelectedSkills, "recreated")
            }
        })
    }

    const successAlert = (roleName, roleDesc, options, text) => {
        let skillNames = []
        options.forEach(selectedOption => {
            skillNames.push(selectedOption.label)
        });
        alert("The role has been "+text+" successfully.\n\nRole Name: "+roleName+"\nRole Description: "+roleDesc+"\nSkills Needed: "+skillNames.join(', '))
        navigate('/RoleMaintenance')
    }

    const handleChange = (options) => {
        setSelectedOptions(options);
        console.log(options)
        if (options.length === 0){
            setShowSkillsError(true)
        }else{
            setShowSkillsError(false)
        }
    };

    const retrieveSkills = (roleId) => {
        // get skill info of deleted roles
        var skills = []
        Axios.get(`http://localhost:5005/api/getRoleSkillsInfo/${roleId}`).then((response)=>{
            response.data.forEach(skill => {
                skills.push({value: skill.skill_id, label: skill.skill_name})
            })
        })
        return skills
    }

    const handleDelChange = (options) => {
        console.log(pastSelectedSkills)
        setPastSelectedSkills(options);
        console.log(options)
        if (options.length === 0){
            setShowDelSkillsError(true)
        }else{
            setShowDelSkillsError(false)
        }
    };

    return (
        <>
        <Header />
        <div className="roleContainer">
            <div >
                <h1>Creation of Role</h1>
                <div className="child">
                    <div className = "box">

                        <Form>

                            <Form.Group className="mb-3" controlId="PrevDeletedRole">
                                <Form.Check type="checkbox" label="Previously Deleted Role" onChange={()=>setChecked(!checked)}/>
                            </Form.Group>
                        {   
                            !checked?
                            <div>
                                <Form.Group className="mb-3" controlId="Role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" maxLength={50} placeholder="Role Name" value={roleName} onChange={(e)=>checkRoleName(e.target.value)}/>
                                    { showNameError ? 
                                    <Form.Label className="text-danger">{nameError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="RoleDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} maxLength={256} placeholder="Description of Role" value={roleDesc} onChange={(e)=>checkRoleDesc(e.target.value)}/>
                                    { showDescError ? 
                                    <Form.Label className="text-danger">{descError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Skills">
                                    <Form.Label>Skills Needed</Form.Label>
                                    <Select isMulti ={true} options={activeSkills} closeMenuOnSelect={false} isSearchable={true} onChange={handleChange} defaultValue={selectedOptions} value={selectedOptions}> 
                                    </Select>
                                    { showSkillsError ? 
                                    <Form.Label className="text-danger">{skillsError}</Form.Label> 
                                    : null }
                                </Form.Group>
                            </div>
                            :
                            <div>
                                <Form.Group className="mb-3" controlId="Role">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select value={selectedRoleId} onChange={(e) => updateSelectedDelRole(e.target.value)}>
                                        <option value='' disabled>Select role</option>
                                        {delRoles.map((delRole)=>{
                                            return( 
                                                <option key={delRole.role_id} value={delRole.role_id}>{delRole.role_name}</option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="RoleDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} maxLength={256} placeholder="Description of Role" value={selectedRoleDesc} onChange={(e)=>checkDelRoleDesc(e)}/>
                                    { showDelDescError ? 
                                    <Form.Label className="text-danger">{delDescError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="Skills">
                                    <Form.Label>Skills Needed</Form.Label>
                                    <Select isMulti ={true} options={activeSkills} closeMenuOnSelect={false} isSearchable={true} onChange={handleDelChange} defaultValue={pastSelectedSkills} value={pastSelectedSkills}> 
                                    </Select>
                                    { showDelSkillsError ? 
                                    <Form.Label className="text-danger">{delSkillsError}</Form.Label> 
                                    : null }
                                </Form.Group>
                            </div>
                        }
                            <div className="text-center">
                                <Button variant="danger" type="button" onClick={()=>navigate('/RoleMaintenance')}>
                                    Cancel
                                </Button>
                                {
                                !checked?
                                <Button variant="primary" type="submit" onClick={e=>createRole(e)} disabled={showNameError || showDescError || showSkillsError}>
                                    Submit
                                </Button>
                                :
                                <Button variant="primary" type="submit" onClick={e=>recreateRole(e)} disabled={selectedRoleId==='' || showDelSkillsError} >
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
export default CreateRole