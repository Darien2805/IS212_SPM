import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./skillCardHR.css";
import { Link,useNavigate } from "react-router-dom";

function RoleCardHR({skillId, skillName, skillDesc}) {
    
    const navigate = useNavigate(); 

    const editSkill = event =>{ 
        //console.log(skillId)
        navigate('/EditSkill',{state:{skillId:skillId}});
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
                <Button className="m-0 me-2 btn-sm" variant="secondary" onClick={editSkill} value={skillId}><EditIcon /></Button>
                <Button className="m-0 btn-sm" variant="danger" onClick={deleteSkill}><DeleteIcon /></Button>
                </div>
            </h3>
            <u>Description</u>
            <p>{skillDesc}</p>
        </div>
    )
}

export default RoleCardHR