import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import Header from '../components/Header'
import RoleCard from '../components/roleCard';
import "./Roles.css"

//Bootstrap
import Alert from 'react-bootstrap/Alert';

function Role() {
  const [staff_id, setStaffId] = useState('')
  const [activeRoles,setActiveRoles] = useState([]);
  const style = { textAlign: 'center' }

  useEffect(()=>{
    setStaffId(window.localStorage.getItem('sessionId')) 
    Axios.get(`http://localhost:5005/api/getActiveRoles/${staff_id}`).then((response)=>{
      setActiveRoles(response.data)
    });
    },[staff_id])
    
    
  return (
    <>
    <Header />
    <div className="rolesContainer">
      <div >
        <h1>All Roles</h1>
        <div className="child">
          { 
          activeRoles.length > 0 ?
            activeRoles.map((role)=>{
              return( 
                <RoleCard role_id = {role.role_id} roleName={role.role_name} roleDesc={role.role_desc} skillNames={JSON.parse(role.skill_names)}
                journey_ID={role.journey_id}/> 
                )
              })
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