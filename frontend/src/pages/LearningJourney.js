import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import Collapsible from "react-collapsible"

function LearningJourney() {

    const [learningJourneyData, setLearningJourneyData] = useState([])
    const actualLearningJourneyData = []
    useEffect(() => {
        const getData = async() => {
               const data = await Axios.get("http://localhost:5005/api/getJourneys/1")

               if(learningJourneyData.length === 0){
                setLearningJourneyData(data.data)
               }
               
            }
        getData().catch(console.error)
        console.log(learningJourneyData)
        const populateRelevantFields = async(role_id,journey_id) => {

            const role = await Axios.get(`http://localhost:5005/api/getRoleSkills/${role_id}`)
            const journey = await Axios.get(`http://localhost:5005/api/getJourneys/${journey_id}`)
            const result = {
                "role" : role,
                "journeyCourses" : journey,
            }
            actualLearningJourneyData.push(result)
            return
        }
        learningJourneyData.map(m => populateRelevantFields(m.role_id,m.journey_id))

    })

  return (
    <>
    <Header />
    <div>

    </div>
    </>
  )
}

export default LearningJourney