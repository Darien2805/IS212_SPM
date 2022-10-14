import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import RoleCardHR from '../components/skillCardHR';
import "./SkillMaintenance.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';

function SkillMaintenance(){

    const [activeSkills, setActiveSkills] = useState([]);

    let navigate = useNavigate(); 

    const routeChange = () =>{ 
        let path = `/CreateSkill`; 
        navigate(path);
    }

    useEffect(()=>{
        Axios.get(`http://localhost:5005/api/getActiveSkills`).then((response)=>{
            var skills = []
            //console.log(response.data)
            response.data.forEach(skill => {
                //console.log(skill)
                skills.push({skill_id: skill.skill_id, skill_name: skill.skill_name, skill_desc: skill.skill_desc, skill_status: skill.skill_status})
                //console.log(skill)
            });
            setActiveSkills(skills)
        });
    },[])
    console.log(activeSkills)

    return (
        <>
        <Header />
        <div>
            <h1>All Skills</h1>
            <Button color='primary' className = "create" onClick={routeChange}> Create </Button>
            <div className="child">
            {
                activeSkills.length > 0 ?
                    activeSkills.map((skill)=>{
                        return( 
                            <RoleCardHR key={skill.skill_id} skillName={skill.skill_name} skillDesc={skill.skill_desc}/> 
                        )
                    })
                :
                    <Alert className='alert' key='warning' variant='warning'>
                        No active skills at the moment
                    </Alert>
                }
            </div>
        </div>
        </>
    )
}
export default SkillMaintenance