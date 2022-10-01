
import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import "./SkillAssignment.css"
//Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function SkillAssignment() {

    const [courseName, toggleSelection] = useState('');
    //console.log(courseName)

    const courses = ["course1" ,"course2", "course3", "course4", "course5", "course6", "course7", "course8", "course9", "course10"]
    return (
        <>
        <Header />
        <div>
            <Row>
                <h1>Skill Assignment</h1>
            </Row>
            
            <Row className="m-auto mt-5 box">
                <Col lg="3" className="p-0 bg-light rounded-3">
                    <ListGroup>
                        {courses.map(course => (
                            <ListGroup.Item action variant="secondary" key={course} className="list" onClick={()=>toggleSelection(course)}>
                                {course}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    {
                        courseName?
                        <div className="p-3">
                            <h4 className="pb-2">{courseName}</h4>
                            <h5>Description</h5>
                            <p className='description'>
                                Testing 1 2 3
                            </p>
                            <h6 style={{display:"inline"}}>Course Type: </h6>
                            Internal / External
                            <br></br><br></br>
                            <h6>Skills Needed</h6>
                            <div>
                                <Form.Group className="mb-3" controlId="Skill">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Dropdown Button
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>Course 1</Dropdown.Item>
                                            <Dropdown.Item>Course 2</Dropdown.Item>
                                            <Dropdown.Item>Course 3</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>
                            </div>
                            <Button variant="primary" type="submit" className="submit">
                                Submit
                            </Button>
                        </div>
                        :null
                    }
                    
                </Col>
            </Row>
        </div>

        

        </>
  )
}

export default SkillAssignment