import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
//import Axios from 'axios'
import Header from '../components/Header'
import "./SkillMaintenance.css"

//Bootstrap
import { Button } from 'react-bootstrap'

function SkillMaintenance(){

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/CreateSkill`; 
        navigate(path);
    }
    

    return (
        <>
        <Header />
        <div className="courseContainer">
            <div >
                <h1>All Skills</h1>
                <div className="child">
                </div>
            </div>
        </div>
        <Button color='primary' className = "create" onClick={routeChange}> Create </Button>
        </>
    )
}
export default SkillMaintenance