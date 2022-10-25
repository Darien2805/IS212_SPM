import Axios from 'axios'


const getJourneyCoursesData = async (journeyID) => {
    try{
        console.log(`http://localhost:5005/api/getJourneyCourses/${journeyID}`)
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
const getJourneyData = async () =>{
    try{
        const response = await Axios.get("http://localhost:5005/api/getJourneys/1")
        return response
    } catch (err){
        return err
    }

}

export {
    getJourneyCoursesData,
    getJourneyData,
    getCourseData,
    getRoleData
}

