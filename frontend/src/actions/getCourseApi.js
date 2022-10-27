import Axios from 'axios'


const getJourneyCoursesData = async (journeyID) => {
    try{

        const journey = await Axios.get(`http://localhost:5005/api/getJourneyCourses/${journeyID}`)

        return journey
    } catch (err) {
        return err
    }

}

const getCourseData = async (courseID) => {
    try{
        const response = await Axios.get(`http://localhost:5005/api/getCourseSkill/${courseID}`)
        return response
    } catch (err){
        return err
    }

}
const getRoleData = async (role_id) =>{
   const response = await Axios.get(`http://localhost:5005/api/getRole/${role_id}`)
   return response
}

const getJourneyData = async (staff_id) =>{
    try{
        const response = await Axios.get(`http://localhost:5005/api/getJourneys/${staff_id}`)
        return response
    } catch (err){
        return err
    }

}
const getGroupedSkillCourses = async () =>{
    try{
        const response = await Axios.get("http://localhost:5005/api/getGroupedSkillCourses")
        return response
    } catch (err){
        return err
    }

}
const getActiveCourses = async (staff_id) =>{
    try{
        const response = await Axios.get(`http://localhost:5005/api/getActiveCourses/${staff_id}`)
        return response
    } catch (err){
        return err
    }

}
const updateJourneyCourse = async ({journey_id,courses}) =>{
    try{
        const response = await Axios.post("http://localhost:5005/api/updateJourneyCourse", {journey_id,courses})
        return response
    } catch (err){
        return err
    }

}

export {
    getJourneyCoursesData,
    getJourneyData,
    getCourseData,
    getRoleData,
    getGroupedSkillCourses,
    getActiveCourses,
    updateJourneyCourse
}

