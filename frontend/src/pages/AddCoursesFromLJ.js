import React,{useState,useEffect,useRef} from 'react'
import { useSearchParams } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import Collapsible from "react-collapsible"

function AddCoursesFromLJ(props) {
    const [allSkills,setAllSkills] = useState([])
    const [courseDetail , setCourseDetail] = useState("")
    const [currentCourseID , setCurrentCourseID] = useState("")
    const [requiredSkills , setRequiredSkills] = useState([])
    const [currentCoursesDoing, setCurrentCoursesDoing] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [roleName , setRoleName] = useSearchParams()
    const dataFetchedRef = useRef(false)
    const learningJourneyID = searchParams.get("journey_id")
    const learningJourneyName = roleName.get("role_name")

    const getCourseData = async (courseID) => {

        await Axios.get(`http://localhost:5005/api/getCourseSkill/${courseID}`).then((res) => console.log("To be done, this is getCourse"))
    }
    const getJourneyData = async (journeyID) => {
        const journey = await Axios.get(`http://localhost:5005/api/getJourneyCourses/${journeyID}`)
        const tempSkills = []
        const tempCourses = []
        const groups = journey.data.reduce((groups, item) => {
            const group = (groups[item.role_skill_name] || []);
            group.push(item);
            // if(!tempCourses.includes(item)){
            //     tempCourses.push(item)
            // }
            groups[item.role_skill_name] = group;
            // if(!tempSkills.includes(item.role_skill_name)){
            //     tempSkills.push(item.role_skill_name)
            // }
            return groups;
          }, {});


        for(const [key,value] of Object.entries(groups)){

            value.map(item => tempCourses.includes(item) ? null : tempCourses.push(item))

            if (!tempSkills.includes(key)){
                tempSkills.push(key)
            }
        }

        setRequiredSkills(tempSkills)
        setCurrentCoursesDoing(tempCourses)

    }
    const getData = async() => {

        const data = await Axios.get("http://localhost:5005/api/getGroupedSkillCourses")

        // console.log(data.data)
        setAllSkills(data.data)
        const allCourseIDs = []
        data.data.map(skill => JSON.parse(skill.course_ids).map(IDs => allCourseIDs.includes(IDs) ? null : allCourseIDs.push(IDs)))

        allCourseIDs.map(IDs => getCourseData(IDs))
     //    for (let i = 0; i < data.data.length; i++) {
     //     console.log("I am being called")
     //     populateRelevantFields(data.data.role_id,data.data.journey_id)
         
     //    }
        getJourneyData(learningJourneyID)

     }

     useEffect(() => {

        if(dataFetchedRef.current) return;
        dataFetchedRef.current = true
        getData().catch(console.error)
        // if(collapsableData.length === 0){
        //     setCollapsableData(actualLearningJourneyData)
        //    }
        // actualLearningJourneyData.map((m) => console.log(m))
        console.log("skills" +requiredSkills)
        console.log("courses" + currentCoursesDoing)
    }, [])    
    const zip = (a1,a2) => a1.map((courseName ,courseSkill) => [courseName , a2[courseSkill]])
    // console.log(zip(JSON.parse(allSkills[0].course_names),JSON.parse(allSkills[0].course_ids)))




  return (
    <>
    <Header />
        <div>AddCoursesFromLJ


        <div className="selectedSkills">
            {allSkills.map((skills) => <>
            <div key={skills.skills_id}>
                <Collapsible trigger={skills.skill_name}>
                    {zip(JSON.parse(skills.course_names),JSON.parse(skills.course_ids)).map(((x) => <><label><input type="checkbox" value={x[1]} />{x[0]} <button>Details</button></label></>))}
                    {courseDetail ? <p>Yes</p>: <p>no</p>}
                </Collapsible>
                

                
            </div></>)}
        </div>
        {/* <div className = "selectedskills">
          {selectedskills.map((skills, index)=>
            <div key={index}>
            <label>Skill {skills.skill_id}</label>
            <Select
            options={courses[index]}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={(e)=>handleChange(e, index)}
            allowSelectAll={true}
            value={skills[index]}
            />
            </div>)}
          
           {/* <label>
           <input type="checkbox" value = '' onChange={()=>handleChange(skills.skill_id)}/>Skill {skills.skill_id}</label> */}
          {/* {courses.map((course)=><label><input type="checkbox" />{course.course_id}</label>)} */}

        {/* </div>
        <div>
            <Button variant="outline-primary" type="submit" className="submit">
                <Link to="/learningjourney">Create</Link>
            </Button>
        </div> */} 
        </div>
    </>

    
  )
}

export default AddCoursesFromLJ