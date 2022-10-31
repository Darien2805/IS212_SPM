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
const getActiveRoles = async (staff_id) =>{
    try{
        const response = await Axios.get(`http://localhost:5005/api/getActiveRoles/${staff_id}`)
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
const updateHRRoleCard = async (roleID) =>{
    try{
        const response = await Axios.put(`http://localhost:5005/api/deleteActiveRole`,{
            role_id: roleID
        })
        return response
    } catch (err){
        return err
    }

}

const updateHRSkillCard = async (skillID) =>{
    try{
        const response = await Axios.put(`http://localhost:5005/api/deleteActiveSkill`,{
            skill_id: skillID
        })
        return response
    } catch (err){
        return err
    }

}
const deleteJourney = async(journeyID) => {
    try{
        const response = await Axios.delete(`http://localhost:5005/api/deleteJourney/${journeyID}`)
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
    updateJourneyCourse,
    getActiveRoles,
    updateHRRoleCard,
    updateHRSkillCard,
    deleteJourney
}

