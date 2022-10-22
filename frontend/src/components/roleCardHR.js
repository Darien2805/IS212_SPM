import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./roleCardHR.css";
import { useNavigate } from "react-router-dom";

function RoleCardHR({roleName, roleDesc, skills, roleId}) {
    const navigate = useNavigate(); 

    const editRole = () =>{ 
        let path = `../UpdateRole`;
        navigate(path, {state:{roleId: roleId}});
    }

    const deleteRole = () =>{ 
        let path = `../DeleteRole`; //need to change the route to delete role page
        navigate(path);
    }

    return (
        <div className="roleCardHR">
            <h3>
                {roleName}
                <div className="float-end">
                <Button className="m-0 me-2 btn-sm" variant="secondary" onClick={editRole}><EditIcon /></Button>
                <Button className="m-0 btn-sm" variant="danger" onClick={deleteRole}><DeleteIcon /></Button>
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