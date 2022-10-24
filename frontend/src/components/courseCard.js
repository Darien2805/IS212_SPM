import React from 'react';
import "./courseCard.css";

//bootstrap
import Badge from 'react-bootstrap/Badge';

function CourseCard({courseName, courseDesc, skillNames, courseType, courseCompletion}) {

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
          return( skill !== null ?
          <Badge bg="secondary" className="me-1"> {skill} </Badge>
          : 
          <div>
            No skills found
          </div>
          )
        })}
      </p>
      <b>
        <u>Course Type</u>
      </b>
      <p>
        <Badge bg="secondary" className="me-1">{courseType}</Badge>
      </p>
      <b>
        <u>Completion Status</u>
      </b>
      <p>
        <Badge bg="secondary" className="me-1"> {courseCompletion} </Badge>
      </p>
  </div>  
  )
}
export default CourseCard