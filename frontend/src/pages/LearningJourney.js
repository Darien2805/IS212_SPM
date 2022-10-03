import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import _ from "lodash"
import Collapsible from "react-collapsible"
import { ClassNames } from '@emotion/react'

function LearningJourney() {

    const [learningJourneyData, setLearningJourneyData] = useState([])
    const populateRelevantFields = async(role_id,journey_id) => {
        const role = await Axios.get(`http://localhost:5005/api/getRole/${role_id}`)
        
        const journey = await Axios.get(`http://localhost:5005/api/getJourneyCourses/${journey_id}`)

        const groups = journey.data.reduce((groups, item) => {
            const group = (groups[item.role_skill_id] || []);
            group.push(item);
            groups[item.role_skill_id] = group;
            return groups;
          }, {});
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
            console.log(learningJourneyData[0].journeyCourses.3)
        // console.log(learningJourneyData[0].journeyCourses.map(x=>console.log(x)))
    
    }
  return (
    <>
    <Header />
    <div>
        <p>I like pie</p>
        {/* {
            learningJourneyData.map(m => populateRelevantFields(m.role_id,m.journey_id).then(result=> result.map(x => console.log(x))))
        } */}
        {
            [...Array(Math.floor(learningJourneyData.length/2))].map((element, index) => (
                <>
                <Collapsible trigger={`LJ to ${learningJourneyData[index].role[0].role_name}`}>
                    {/* {learningJourneyData[index].journeyCourses.map(courses => (
                        <h1>{courses.course_name}</h1>
                    ))} */}
                </Collapsible>
                <p>{index} and {element}</p>
                </>
            ))

        }
    </div>
    </>
  )
}

export default LearningJourney