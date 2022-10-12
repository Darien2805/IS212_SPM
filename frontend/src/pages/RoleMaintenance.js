import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import Header from '../components/Header'
import RoleCardHR from '../components/roleCardHR';
import "./RoleMaintenance.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';

function RoleMaintenance(){
    const [staffId, setStaffId] = useState('')
    const [activeRoles, setActiveRoles] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        setStaffId(1) // for now set as 1

        if (staffId!==''){
            Axios.get(`http://localhost:5005/api/getActiveRoles/${staffId}`).then((response)=>{
                var roles = []
                response.data.forEach(role => {
                    let skillNames = JSON.parse(role.skill_names)
                    roles.push({role_id: role.role_id, role_name: role.role_name, role_desc: role.role_desc, skill_names: skillNames})
                });
                setActiveRoles(roles)
            });
        }
    }, [staffId])

    const routeChange = () =>{ 
        let path = `/CreateRole`; 
        navigate(path);
    }

    return (
        <>
        <Header />
        <div className="allRolesContainer">
            <div >
                <h1>All Roles</h1>
                <Button color='primary' className = "create" onClick={routeChange}> Create </Button>
                <div className="child">
                    {
                        activeRoles.length > 0 ?
                            activeRoles.map((role)=>{
                                return( 
                                    <RoleCardHR key={role.role_id} roleName={role.role_name} roleDesc={role.role_desc} skills={role.skill_names} roleId={role.role_id} /> 
                                )
                            })
                        :
                            <Alert className='alert' key='warning' variant='warning'>
                                No active job roles at the moment
                            </Alert>
                    }
                </div>
            </div>
        </div>
        
        </>
    )
}
export default RoleMaintenance