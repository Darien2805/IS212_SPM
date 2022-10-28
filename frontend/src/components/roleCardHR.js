import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./roleCardHR.css";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

function RoleCardHR({roleName, roleDesc, skills, roleId}) {
    const navigate = useNavigate(); 

    const [show, setShow] = useState(false);

    const editRole = () =>{ 
        let path = `../UpdateRole`;
        navigate(path, {state:{roleId: roleId}});
    }

    const showModal = () =>{ 
        setShow(true)
    }

    const hideModal = () =>{ 
        setShow(false)
    }

    const deleteRole = () =>{ 
        Axios.put(`http://localhost:5005/api/deleteActiveRole`,{
            role_id: roleId
        }).then(()=>{
            console.log("success")
        });

        window.location.reload(false);
    }

    return (
        <div className="roleCardHR">
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                <Modal.Title>Delete {roleName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this role?</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={deleteRole}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
            
            <h3>
                {roleName}
                <div className="float-end">
                <Button className="m-0 me-2 btn-sm" variant="secondary" onClick={editRole}><EditIcon /></Button>
                <Button className="m-0 btn-sm" variant="danger" onClick={showModal}><DeleteIcon /></Button>
                </div>
            </h3>
            <u>Description</u>
            <p>{roleDesc}</p>
            <u>Skills Needed</u>
            <p className="mb-1">
                {skills.map((skill)=>{
                    return( 
                        <Badge key={skill} pill bg="light" text="dark" className="me-1">
                            {skill}
                        </Badge>
                    )
                })}
            </p>
        </div>
    )
}

export default RoleCardHR