import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./skillCardHR.css";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

function RoleCardHR({skillId, skillName, skillDesc,}) {

    const [show, setShow] = useState(false);
    
    const navigate = useNavigate(); 

    const editSkill = event =>{ 
        //console.log(skillId)
        navigate('/EditSkill',{state:{skillId:skillId}});
    }

    const showModal = () =>{ 
        setShow(true)
    }

    const hideModal = () =>{ 
        setShow(false)
    }

    const deleteSkill = () =>{
        console.log(skillId)
        Axios.put(`http://localhost:5005/api/deleteActiveSkill`,{
            skill_id: skillId
        }).then(()=>{
            console.log("success")
        });

        window.location.reload(false);
    }
    

    return (
        <div className="skillCardHR">

            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                <Modal.Title>Delete {skillName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this skill?</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={deleteSkill}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>

            <h3>
                {skillName}
                <div className="float-end">
                <Button className="m-0 me-2 btn-sm" variant="secondary" onClick={editSkill}><EditIcon /></Button>
                <Button className="m-0 btn-sm" variant="danger" onClick={showModal}><DeleteIcon /></Button>
                </div>
            </h3>
            <u>Description</u>
            <p>{skillDesc}</p>

            
        </div>
    )
}

export default RoleCardHR