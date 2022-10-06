import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import Collapsible from "react-collapsible"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ClassNames } from '@emotion/react'

import "./LearningJourney.css"
import "../index.css"

function LearningJourney() {

    const [learningJourneyData, setLearningJourneyData] = useState([])
    const dataFetchedRef = useRef(false)
    const populateRelevantFields = async(role_id,journey_id) => {
        const role = await Axios.get(`http://localhost:5005/api/getRole/${role_id}`)
        
        const journey = await Axios.get(`http://localhost:5005/api/getJourneyCourses/${journey_id}`)

        const groups = journey.data.reduce((groups, item) => {
            const group = (groups[item.role_skill_name] || []);
            group.push(item);
            groups[item.role_skill_name] = group;
            return groups;
          }, {});
        //   console.log(journey.data)
        // console.log(groups)
        const result = {
            "role": role.data,
            "journeyCourses": groups,

        }
        // setCollapsableData(actualLearningJourneyData)
        setLearningJourneyData(prevArray => [...prevArray,result])
        return result
    }
    const getData = async() => {

        const data = await Axios.get("http://localhost:5005/api/getJourneys/1")
        console.log(data.data)
     //    for (let i = 0; i < data.data.length; i++) {
     //     console.log("I am being called")
     //     populateRelevantFields(data.data.role_id,data.data.journey_id)
         
     //    }
        
        data.data.map(journey => populateRelevantFields(journey.role_id,journey.journey_id))
        
       
     
     }
    useEffect(() => {

        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true
        getData().catch(console.error)
        // if(collapsableData.length === 0){
        //     setCollapsableData(actualLearningJourneyData)
        //    }
        // actualLearningJourneyData.map((m) => console.log(m))

    }, [])    
        if(learningJourneyData.length > 0 ){
            // for(const key in learningJourneyData[0].journeyCourses){
            //     console.log(key)
            //     console.log(learningJourneyData[0].journeyCourses[key])
            // console.log("I am happening"+ learningJourneyData[0])
            
            console.log(learningJourneyData)
        // console.log(learningJourneyData[0].journeyCourses.map(x=>console.log(x)))
    
    }
  return (
    <>
    <Header />
    <div className="learningJourneyContainer">
        
        {/* {

            [...Array(Math.floor(learningJourneyData.length/2))] to get only half of the tables because use effect calls data twice
        } */}
        {
            learningJourneyData.map((element, index) => (
                <>
                <div className="collapsibleMenu" key={index}>
                
                <Collapsible trigger={[`LJ to ${learningJourneyData[index].role[0].role_name}`,<ArrowDropDownIcon />]}>
                    <div className="innerContent">
                    {
                        Object.keys(learningJourneyData[index].journeyCourses).map((journey) => journey === "null" ? (<p>whoops no skill</p>) : (
                            <>
                            <h3 key={journey}>{journey}</h3>
                            {learningJourneyData[index].journeyCourses[journey].map((skill) => skill.course_name === null ? (<p>no course name</p>) : (
                            <div key={skill.course_id} className="courseJourney">
                            <p>{skill.course_name}</p>
                            <button className="newButton"><DeleteIcon /></button>
                            </div>
                            ))}
                            </>
                        ))
                    }
                    

                    <div className="addJourney">
                        <button className="addButton"><AddIcon /></button>
                        
                    </div>
                    </div>
                </Collapsible>
                
                
                <div className="triggerComponent">
                    <button className="newButton"><DeleteIcon /></button>
                </div>

                </div>
                </>
            ))

        }
    </div>
    </>
  )
}

export default LearningJourney