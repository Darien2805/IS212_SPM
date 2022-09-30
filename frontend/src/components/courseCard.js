import React from 'react';
import "./courseCard.css";

function CourseCard({title,description}) {
  return (
    
    <div className="courseCard">
        <h1>{title}</h1>
        <p>{description}</p>
        {/* subject to change , pending th completion of skeel table */}
        {/* {skills.map((skill) =>(
            <div key={skill._id}>
                <p>{skill.name}</p>
            </div>
        ))} */}
        <p>Skeels:</p>
        <div className="stageRight">
            <button>View</button>
        </div>
    </div>
    
  )
}

export default CourseCard