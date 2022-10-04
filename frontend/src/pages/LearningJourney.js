import React,{useState,useEffect} from 'react'
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
    useEffect(() => {

        const getData = async() => {

               const data = await Axios.get("http://localhost:5005/api/getJourneys/1")
               console.log(data.data)
            //    for (let i = 0; i < data.data.length; i++) {
            //     console.log("I am being called")
            //     populateRelevantFields(data.data.role_id,data.data.journey_id)
                
            //    }
               
               data.data.map(journey => populateRelevantFields(journey.role_id,journey.journey_id))
               
              
            
            }
        getData().catch(console.error)
        // if(collapsableData.length === 0){
        //     setCollapsableData(actualLearningJourneyData)
        //    }
        // actualLearningJourneyData.map((m) => console.log(m))
        console.log("I am being triggered")
    }, [])    
        if(learningJourneyData.length > 0 ){
            // for(const key in learningJourneyData[0].journeyCourses){
            //     console.log(key)
            //     console.log(learningJourneyData[0].journeyCourses[key])
            // console.log("I am happening"+ learningJourneyData[0])
            
            console.log(learningJourneyData[0])
        // console.log(learningJourneyData[0].journeyCourses.map(x=>console.log(x)))
    
    }
  return (
    <>
    <Header />
    <div className="learningJourneyContainer">
        
        {/* {
            learningJourneyData.map(m => populateRelevantFields(m.role_id,m.journey_id).then(result=> result.map(x => console.log(x))))
        } */}
        {
            [...Array(Math.floor(learningJourneyData.length/2))].map((element, index) => (
                <>
                <div className="collapsibleMenu">
                
                <Collapsible trigger={[`LJ to ${learningJourneyData[index].role[0].role_name}`,<ArrowDropDownIcon />]}>
                    <div className="innerContent">
                    {
                        Object.keys(learningJourneyData[index].journeyCourses).map(journey => (
                            <>
                            <h3>{journey}</h3>
                            {learningJourneyData[index].journeyCourses[journey].map(skill=>
                            <div key={skill.course_id}>
                            <p>{skill.course_name}</p>
                            </div>
                            )}
                            </>
                        ))
                    }
                    </div>

                    <div>
                        <button className="addButton"><AddIcon /></button>
                        
                    </div>
                </Collapsible>
                
                
                <div className="triggerComponent">
                    <button className="newButton"><DeleteIcon /></button>
                </div>
                <div className="triggerComponent">
                    <p>%Completion</p>
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