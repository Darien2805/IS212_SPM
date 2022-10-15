import React from 'react';
import Button from 'react-bootstrap/Button';
import "./roleCard.css";
import { useNavigate } from "react-router-dom";

function RoleCard({roleId, roleName,roleDesc,roleRes}) {
    const navigate = useNavigate();

    const routeChange = () =>{ 
        navigate('/SelectSkills', { state: { role_id: roleId } });
    }

  return (
    
    <div className="roleCard">
        <h3>{roleName}</h3>
        <p>{roleDesc}</p>
        <p>{roleRes}</p>
        <div style={{ display: "flex" }}>
        <Button variant="secondary" style={{ marginLeft: "auto" }} onClick={routeChange}>Create Learning Journey</Button>
        </div>
    </div>
  )
}

export default RoleCard