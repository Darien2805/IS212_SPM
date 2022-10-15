import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import RoleCard from '../components/roleCard';
import "./Roles.css"

//Bootstrap
import Alert from 'react-bootstrap/Alert';


function Role() {
  const [activeRoles,setRoles] = useState([]);
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
          {activeRoles.map((role)=>{
            return( role.role_status === "Active" ?
            <RoleCard key={role.role_id} roleName={role.role_name} roleDesc={role.role_desc} skillNames={JSON.parse(role.skill_names)}
              journey_ID={role.journey_id}/> 
            :
            <Alert className='alert' key='warning' variant='warning'>
              No active job roles at the moment
            </Alert>)
          })}
        </div>
      </div>
    </div>
    </>
  )
}
export default Role