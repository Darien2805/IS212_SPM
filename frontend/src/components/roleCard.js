import React from 'react';
import "./roleCard.css";
import { useNavigate } from "react-router-dom";

//bootstrap
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function RoleCard({roleId,roleName,roleDesc,skillNames,journey_ID}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");
  const style = { color: 'red' };
  
  const HandleValidation = () => {
    if (journey_ID === null) {
      navigate('/SelectSkills', { state: { role_id: roleId } });
    } else {
      setErrorMessage("Learning Journey has already been created!")
    }
  }
  
  return (
  <div className="roleCard">
    <h2>{roleName}</h2>
    <b>
      <u>Description</u>
    </b>
    <p>{roleDesc}</p>
    <b>
      <u>Skills needed</u>
    </b>
    <p>
      {
      skillNames.map((skill)=>{
        return( skill !== null ?
        <Badge bg="secondary" className="me-1"> {skill} </Badge> : []
        )
      })
      }
    </p>
    <div style={{ display: "flex" }}>
      <Button variant="secondary" style={{ marginLeft: "auto" }} onClick={HandleValidation}>Create Learning Journey</Button>
    </div>
    <b>
      {errorMessage && <div className="text-end" style={style}> {errorMessage} </div>}
    </b>
    </div>
  )
}

export default RoleCard