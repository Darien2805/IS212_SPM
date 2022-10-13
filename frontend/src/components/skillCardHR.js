import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./skillCardHR.css";
import { useNavigate } from "react-router-dom";

function RoleCardHR({skill_id, skillName, skillDesc,}) {
    
    const navigate = useNavigate(); 

    const editSkill = () =>{ 
        let path = `../EditSkill`; //need to change the route to edit role page
        navigate(path);
    }

    const deleteSkill = () =>{ 
        let path = `../DeleteSkill`; //need to change the route to delete role page
        navigate(path);
    }

    return (
        <div className="skillCardHR">
            <h3>
                {skillName}
                <div className="float-end">
                <Button className="m-0 me-2 btn-sm" variant="secondary" onClick={editSkill}><EditIcon /></Button>
                <Button className="m-0 btn-sm" variant="danger" onClick={deleteSkill}><DeleteIcon /></Button>
                </div>
            </h3>
            <u>Description</u>
            <p>{skillDesc}</p>
        </div>
    )
}

export default RoleCardHR