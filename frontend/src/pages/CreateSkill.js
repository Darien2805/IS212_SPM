import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
//import Axios from 'axios'
import Header from '../components/Header'
import "./CreateSkill.css"

//Bootstrap
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

function CreateSkill(){

    const [checked, setChecked] = useState(false);

    return (
        <>
        <Header />
        <div className="courseContainer">
            <div >
                <h1>Creation of Skills</h1>
                <div className="child">
                    <div className = "box">

                        <Form>

                            <Form.Group className="mb-3" controlId="PrevDeletedSkill">
                                <Form.Check type="checkbox" label="Previously Deleted Skill" onChange={()=>setChecked(!checked)}/>
                            </Form.Group>
                        {   
                            !checked?
                            <Form.Group className="mb-3" controlId="Skill">
                                <Form.Label>Skill</Form.Label>
                                <Form.Control type="text" placeholder="Skill Name" />
                            </Form.Group>
                            :null
                        }
                            
                        {
                            checked?
                            <Form.Group className="mb-3" controlId="Skill">
                                <Form.Label>Skill</Form.Label>
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
                            :null
                            
                        }
                            
                            <Form.Group className="mb-3" controlId="SkillDescrip">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Description of Skill" />
                            </Form.Group>
                            
                            <div className="text-center">
                                <Button variant="danger" type="submit">
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                            
                        </Form>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default CreateSkill