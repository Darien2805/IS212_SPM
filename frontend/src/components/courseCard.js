import React from 'react';
import "./courseCard.css";
import { useNavigate } from "react-router-dom";

//bootstrap
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

function CourseCard({courseName,courseDesc,skillNames,courseType}) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `../Roles`; //need to change the route 
    navigate(path);
  }

  return (
    <div className="courseCard">
      <h2>{courseName}</h2>
      <b>
        <u>Description</u>
      </b>
      <p>{courseDesc}</p>
      <b>
        <u>Skills needed</u>
      </b>
      <p>
        {skillNames.map((skill)=>{
          return( 
          <Badge bg="secondary" className="me-1"> {skill} </Badge>
          )
        })}
      </p>
      <b>
        <u>Course Type</u>
      </b>
      <p>
        <Badge bg="secondary" className="me-1">{courseType}</Badge>
      </p>
  </div>  
  )
}
export default CourseCard