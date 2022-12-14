import React, {useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import RoleCard from '../components/roleCard';
import "./Roles.css"
import TextField from "@mui/material/TextField";

import { getActiveRoles } from '../actions/getCourseApi';

//Bootstrap
import Alert from 'react-bootstrap/Alert';

function Role() {
  const [activeRoles,setActiveRoles] = useState([]);
  const style = { textAlign: 'center' }
  const staffID = window.localStorage.getItem('sessionId')
  const [query, setQuery] = useState("")

  const getData = async() => {
    const result = await getActiveRoles(staffID)
    setActiveRoles(result.data)
  }
  useEffect(()=>{
  getData()
  },[])
  
  const filterRoles = (role) => {
    return role.role_name.toLowerCase().includes(query.toLowerCase())
  }
    
  return (
    <>
    <Header />
    <div className="rolesContainer">
      <div >
        <h1>All Roles</h1>
        <div className = "main">
          <div className = "search">
            <TextField id="outlined-basic" variant="outlined" fullwidth label="Search" onChange={event => setQuery(event.target.value)} />
          </div>
        </div>
        <div className="child">
          { activeRoles.length > 0 ? (
            activeRoles.filter(filterRoles).length === 0 ? 
            <p style = {style}>
              <Alert className='alert' key='warning' variant='warning'>
                No roles match the search input
              </Alert>
            </p>
            :
            activeRoles.filter(filterRoles).map((role) => {
              return( 
                <RoleCard role_id = {role.role_id} roleName={role.role_name} roleDesc={role.role_desc} skillNames={JSON.parse(role.skill_names)}
                journey_ID={role.journey_id}/> 
                )
              })
           )
            :
            <p style = {style}>
              <Alert className='alert' key='warning' variant='warning'>
                No active job roles at the moment
              </Alert>
            </p>
            
          }
        </div>
      </div>
    </div>
    </>
  )
}
export default Role