import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Axios
import Axios from 'axios'

import "./Home.css"
function Home() {

  const [staffid, setStaffid] = useState('');
  const [staffType, setStaffType] = useState('');

  const stafftype = (e) => {
    console.log(staffid)
    Axios.get("http://localhost:5005/api/getUserType/"+staffid).then((response)=>{
      setStaffType(response.data.user_type)
      console.log(response.data.user_type);   
    });
  }
  
  let data = JSON.parse(window.localStorage.getItem("navItem"));
  window.localStorage.setItem("data", JSON.stringify(data));
  // console.log(data)

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
              <Form.Control type="text" className = "field mb-3" placeholder="Enter Staff ID" onChange={(e) => { setStaffid(e.target.value) }}/>
              <Button type="submit" onClick={e=>stafftype(e)}>Submit</Button>
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