import React from 'react';
import Button from 'react-bootstrap/Button';
import "./roleCard.css";
import { useNavigate } from "react-router-dom";

function RoleCard({roleName,roleDesc,roleRes}) {

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `../Courses`; //need to change the route to create learning journey page
        navigate(path);
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