import React,{useState,useEffect,useRef} from 'react'
import Header from '../components/Header'
import Collapsible from "react-collapsible"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

import { Link } from 'react-router-dom';
import { deleteJourney, getJourneyCoursesData,
    getJourneyData,
    getRoleData} from "../actions/getCourseApi.js"

import "./LearningJourney.css"
import "../index.css"

function LearningJourney(props) {
    const staffID = window.localStorage.getItem('sessionId')
    const [learningJourneyData, setLearningJourneyData] = useState([])
    const [somethingDeleted,setSomethingDeleted] = useState(false)
    const dataFetchedRef = useRef(false)
    const populateRelevantFields = async(role_id,journey_id) => {
        const role = await getRoleData(role_id)
        // const role = await Axios.get(`http://localhost:5005/api/getRole/${role_id}`)
        
        const journey = await getJourneyCoursesData(journey_id)
 

        // const journey = await Axios.get(`http://localhost:5005/api/getJourneyCourses/${journey_id}`)

        const groups = journey.data.reduce((groups, item) => {
            const group = (groups[item.role_skill_name] || []);
            group.push(item);
            groups[item.role_skill_name] = group;
            return groups;
          }, {});

        const result = {
            "role": role.data,
            "journeyCourses": groups,
            "journeyID" : journey_id
        }
        setLearningJourneyData(prevArray => [...prevArray,result])
        return result
    }
    const getData = async() => {

        const data = await getJourneyData(staffID)

        data.data.map(journey => populateRelevantFields(journey.role_id,journey.journey_id))
        
       
     
     }
    const deleteAJourney = async(journeyID) => {
        const data = await deleteJourney(journeyID)
        return data
    }
    const handleDelete = async(journeyID) => {
        setSomethingDeleted("Journey successfully deleted, please reload the page to see changes")
 
         const data = await deleteAJourney(journeyID)
        


    }
     useEffect(() => {

        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true
        getData().catch(console.error)
        

    },)     
  
    //     if(learningJourneyData.length > 0 ){

    //     console.log(learningJourneyData[0])
    
    // }
  return (
    <>
    <Header />
    <div className="learningJourneyContainer">
    {somethingDeleted ? <p className="errMsg">{somethingDeleted}</p> : <p>{somethingDeleted}</p>}
        
        {
            learningJourneyData.map((element, index) => (
                <>
                <div className="collapsibleMenu" key={index}>
                
                <Collapsible trigger={[`LJ to ${learningJourneyData[index].role[0].role_name}`,<><div className="test"><ArrowDropDownIcon /></div></>]}>
                <button className="newButton" onClick={() => handleDelete(learningJourneyData[index].journeyID)}><DeleteIcon /></button>
                    <div className="innerContent">
                    {
                        Object.keys(learningJourneyData[index].journeyCourses).map((journey) => journey === "null" ? (
                            <>
                            <h3 key={journey}>Other courses</h3>
                            {learningJourneyData[index].journeyCourses[journey].map((skill) => 
                            <div key={skill.course_id} className="courseJourney">
                            <p>{skill.course_name} (Status: {skill.course_status})</p>

                            </div>
                            )}
                            </>
                            ) : (
                            <>
                            <h3 key={journey}>{journey}</h3>
                            {learningJourneyData[index].journeyCourses[journey].map((skill) => skill.course_name === null ? (<p>No courses added yet</p>) : (
                            <div key={skill.course_id} className="courseJourney">
                            <p>{skill.course_name} (Status: {skill.course_status})</p>

                            </div>
                            ))}
                            </>
                        ))
                        
                    }
                    

                    <div className="addJourney">
                        {learningJourneyData[index].role[0].role_status === "Deleted" ? " " : <>
                        <Link to={`addCourses?journey_id=${learningJourneyData[index].journeyID}&role_name=${learningJourneyData[index].role[0].role_name}`} className="fancyLink" target="_blank">
                            
                        
                            <p><AddIcon />Update Courses in Journey</p>
                            
                            
                            
                            </Link>
                        </>}

                        
                    </div>
                    </div>
                </Collapsible>
                
                
                {/* <div className="triggerComponent">
                    <button className="newButton" ><DeleteIcon /></button>
                </div> */}

                </div>
                </>
            ))

        }
    </div>
    </>
  )
}

export default LearningJourney