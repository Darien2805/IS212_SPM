import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
//Axios
import Axios from 'axios'

import "./Home.css"
function Home() {

  const [staffid, setStaffid] = useState('');
  const [staffType, setStaffType] = useState('');

  const [showAssignError, setShowAssignError] = useState(true);   
  const [assignError, setAssignError] = useState('');   

  const navigate = useNavigate();

  const stafftype = (e) => {
    Axios.get("http://localhost:5005/api/getUserType/"+staffid).then((response)=>{
      //console.log(response.data.length)
      if (response.data.length==0){
        setAssignError("Invalid staff id")
        setShowAssignError(true)
      }else{
        //setStaffType(response.data.user_type)
        //console.log(response.data.user_type);   
        localStorage.setItem('sessionId', staffid);
        navigate('/learningjourney')
      }
    });
  }

  const sessionId = window.localStorage.getItem('sessionId');
  //console.log(sessionId)

  useEffect(()=>{
    // set name and desc errors
    setAssignError("Staff id cannot be left empty")
  },[])

  const handleChange = (e) =>{
    setStaffid(e.target.value)
    if (e.target.value == 0){
      setShowAssignError(true)
    }else{
      setShowAssignError(false)
    }
    
};


  return (
    <>
    <Header />
    <div>
    <Row>
      <Col></Col>
      <Col>
        <div className='container'> 
          <h1 className='m-4'>Login</h1>
          <Form.Group className="m-5" controlId="formBasicEmail">
              <Form.Label className = "mb-3">Staff ID</Form.Label>
              <Form.Control 
                type="text" 
                className = "field mb-3" 
                placeholder="Enter Staff ID"
                value= {staffid}
                onChange={(e) => {handleChange(e)}}/>

              { showAssignError ? 
                <Form.Label className="text-danger">{assignError}</Form.Label> 
              : null }
              <div>
                <Button type="submit" 
                onClick={e=>stafftype(e)}  
                disabled={showAssignError}>Enter</Button>
              </div>
            </Form.Group>
        </div>
      </Col>
      <Col></Col>
    </Row>
      
      
    </div>
    </>
  )
}

export default Home