import React,{useState,useEffect,useRef} from 'react'
import Axios from 'axios'
import Header from '../components/Header'

function AddCoursesFromLJ(props) {
    const [selectSkills,setSelectSkills] = useState([])
    const dataFetchedRef = useRef(false)
    const getData = async() => {

        const data = await Axios.get("http://localhost:5005/api/getGroupedSkillCourses")
        console.log(data.data)
     //    for (let i = 0; i < data.data.length; i++) {
     //     console.log("I am being called")
     //     populateRelevantFields(data.data.role_id,data.data.journey_id)
         
     //    }
     
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
  return (
    <>
    <Header />
        <div>addCoursesFromLJ</div>
    </>

    
  )
}

export default AddCoursesFromLJ