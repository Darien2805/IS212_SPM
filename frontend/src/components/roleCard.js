import React from 'react';
import Button from 'react-bootstrap/Button';
import "./roleCard.css";

function RoleCard({roleName,roleDesc,roleRes}) {
  return (
    
    <div className="roleCard">
        <h3>{roleName}</h3>
        <p>{roleDesc}</p>
        <p>{roleRes}</p>
        <div style={{ display: "flex" }}>
        <Button variant="secondary" style={{ marginLeft: "auto" }}>Create Learning Journey</Button>
        </div>
    </div>
  )
}

export default RoleCard