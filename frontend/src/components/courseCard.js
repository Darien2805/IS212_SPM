import React from 'react';
import "./courseCard.css";

//bootstrap
import Badge from 'react-bootstrap/Badge';

function CourseCard({courseName,courseDesc,skillNames,courseType}) {

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