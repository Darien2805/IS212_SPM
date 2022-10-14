import React,{useState,useEffect} from 'react'
import Axios from 'axios'

import Header from '../components/Header'
import RoleCard from '../components/roleCard';
import "./Roles.css"
//Bootstrap
function Role() {
  const [roles,setRoles] = useState([]);
  const staff_id = 2

  useEffect(()=>{
    Axios.get(`http://localhost:5005/api/getActiveRoles/${staff_id}`).then((response)=>{
      setRoles(response.data)
    });
    },[])

  return (
    <>
    <Header />
    <div className="rolesContainer">
      <div >
        <h1>All Roles</h1>
        <div className="child">
          {roles.map((val)=>{
            return( val.role_status === "Active" ?
            <RoleCard key={val.role_id} roleName={val.role_name} roleDesc={val.role_desc} skillNames={val.skill_names}/> : [])
            })}
        </div>
      </div>
    </div>
    </>
  )
}
export default Role