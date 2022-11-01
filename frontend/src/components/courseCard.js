import React from 'react';
import "./courseCard.css";

//bootstrap
import Badge from 'react-bootstrap/Badge';

function CourseCard({courseNames, courseDesc, skillNames, courseType, courseCompletionStatus}) {

  return (
    <div className="courseCard">
      <h2>{courseNames}</h2>
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
          <Badge bg="secondary" className="me-1"> {skill} </Badge> : "No skills found"
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
        <Badge bg="secondary" className="me-1"> {courseCompletionStatus ? courseCompletionStatus : "Uncompleted"} </Badge>
      </p>
  </div>
  )
}
export default CourseCard