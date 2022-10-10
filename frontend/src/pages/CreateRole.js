import React,{useState,useEffect } from 'react'
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
    const [roleName, setRoleName] = useState('');                     // role name of new role
    const [roleDesc, setRoleDesc] = useState('');                     // role description of new role
    const [currRoleNames, setCurrRoleNames] = useState([]);           // all existing role names in database
    const [nameError, setNameError] = useState('');                     // error from new role name
    const [showNameError, setShowNameError] = useState(true);           // display error from new role name
    const [descError, setDescError] = useState('');                     // error from new role description
    const [showDescError, setShowDescError] = useState(true);           // display error from new role description
    const [delRoles, setDelRoles] = useState([]);                     // role name of new role
    const [selectedRoleId, setSelectedRoleId] = useState('');         // role id of recreated role
    const [selectedRoleDesc, setSelectedRoleDesc] = useState('');     // role description of recreated role
    const [delDescError, setDelDescError] = useState('');               // error from recreated role description
    const [showDelDescError, setShowDelDescError] = useState(false);    // display error from recreated role description
    const navigate = useNavigate();

    useEffect(()=>{
        // set name and desc errors
        setNameError("The role name cannot be left empty.")
        setDescError("The role description cannot be left empty.")
    },[])

    // tbh idk if whether i should just put this chunk in the checkRoleName function
    useEffect(()=>{
        // store all existing role names
        Axios.get("http://localhost:5005/api/getAllRoles").then((response)=>{
            let roleNames = []
            response.data.forEach(role => {
                roleNames.push(role.role_name.toLowerCase())
            });            
            setCurrRoleNames(roleNames)
            // console.log("hi",currRoleNames)
        });
    },[roleName])

    // tbh idk if whether i should just put this chunk in the updateChecked function
    useEffect(()=>{
        // store all deleted roles
        Axios.get("http://localhost:5005/api/getDeletedRoles").then((response)=>{
            setDelRoles(response.data)
            // console.log("bye",delRoles)
        });
    },[checked])

    const checkRoleName = (e) => {
        console.log('target.value:',e.target.value)
        setRoleName(e.target.value)
        console.log('roleName var:',roleName)
        console.log(currRoleNames.includes(e.target.value.toLowerCase()))
        if (currRoleNames.includes(e.target.value.toLowerCase())){
            setNameError("The role name already exists in the system.")
            setShowNameError(true)
        }
        else if (e.target.value.length === 0){
            setNameError("The role name cannot be left empty.")
            setShowNameError(true)
        }
        else if (e.target.value.trim().length === 0){
            setNameError("The role name cannot be filled with spaces only.")
            setShowNameError(true)
        }
        else{
            setShowNameError(false)
        }
    }

    const checkRoleDesc = (e) => {
        console.log(e.target.value)
        setRoleDesc(e.target.value)
        console.log(roleDesc)

        if (e.target.value.length === 0){
            setDescError("The role description cannot be left empty.")
            setShowDescError(true)
        }
        else if (e.target.value.trim().length === 0){
            setDescError("The role description cannot be filled with spaces only.")
            setShowDescError(true)
        }
        // else if (e.target.value.trim().length >256){
        //     setDescError("The role description cannot be more than 256 characters.")
        //     setShowDescError(true)
        // }
        else{
            setShowDescError(false)
        }
    }

    const createRole = (e) => {
        Axios.post('http://localhost:5005/api/createRole', {
            role_name: roleName, 
            role_desc: roleDesc
        }).then(()=>{
            alert("successfully insert")
        })
        successAlert(roleName, roleDesc)
    }

    const updateSelectedDelRole = (roleId) => {
        setSelectedRoleId(roleId)
        delRoles.forEach(role => {
            if (role.role_id === roleId){
                setSelectedRoleDesc(role.role_desc)
            }
        });
        console.log(selectedRoleId,selectedRoleDesc)
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
        Axios.post('http://localhost:5005/api/updateDeletedRole', {
            role_id: selectedRoleId, 
            role_desc: selectedRoleDesc
        }).then(()=>{
            alert("successfully insert")
        })

        delRoles.forEach(role => {
            if (role.role_id === selectedRoleId){
                successAlert(role.role_name, role.role_desc)
            }
        });
        
    }

    const successAlert = (roleName, roleDesc) => {
        alert("The role has been created successfully.\n\nRole Name: "+roleName+"\nRole Description: "+roleDesc)
        navigate('/RoleMaintenance')
    }

    return (
        <>
        <Header />
        <div className="courseContainer">
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
                                    <Form.Control type="text" maxLength={20} placeholder="Role Name" value={roleName} onChange={(e)=>checkRoleName(e)}/>
                                    { showNameError ? 
                                    <Form.Label className="text-danger">{nameError}</Form.Label> 
                                    : null }
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="RoleDescrip">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} maxLength={256} placeholder="Description of Role" value={roleDesc} onChange={(e)=>checkRoleDesc(e)}/>
                                    { showDescError ? 
                                    <Form.Label className="text-danger">{descError}</Form.Label> 
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
                            </div>
                        }
                            <div className="text-center">
                                <Button variant="danger" type="button" onClick={()=>navigate('/RoleMaintenance')}>
                                    Cancel
                                </Button>
                                {
                                !checked?
                                <Button variant="primary" type="submit" onClick={e=>createRole(e)} disabled={showNameError || showDescError}>
                                    Submit
                                </Button>
                                :
                                <Button variant="primary" type="submit" onClick={e=>recreateRole(e)} disabled={selectedRoleId===''} >
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