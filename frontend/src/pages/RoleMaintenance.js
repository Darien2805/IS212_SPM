import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
//import Axios from 'axios'
import Header from '../components/Header'
import "./RoleMaintenance.css"

//Bootstrap
import { Button } from 'react-bootstrap'

function RoleMaintenance(){

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `/CreateRole`; 
        navigate(path);
    }
    

    return (
        <>
        <Header />
        <div className="courseContainer">
            <div >
                <h1>All Active Roles</h1>
                <div className="child">
                </div>
            </div>
        </div>
        <Button color='primary' className = "create" onClick={routeChange}> Create </Button>
        </>
    )
}
export default RoleMaintenance