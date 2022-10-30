import {render, screen} from '@testing-library/react'
import  AddCoursesFromLJ from "../pages/AddCoursesFromLJ.js"
import * as APIServices from "../actions/getCourseApi.js"
import Axios from 'axios'

jest.mock("axios")

describe('Test Apis', () => {
    describe('getJourneyCourses', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                const mockData = [
                    {
                        "role_skill_id": 1,
                        "role_skill_name": "skill 1",
                        "course_id": "C1",
                        "course_name": "Course 1",
                        "course_desc": "Course 1 is on....",
                        "course_status": "Active",
                        "course_type": "Internal"
                    },
                    {
                        "role_skill_id": 1,
                        "role_skill_name": "skill 1",
                        "course_id": "C5",
                        "course_name": "Course 5",
                        "course_desc": "Course 5 is on....",
                        "course_status": "Active",
                        "course_type": "External"
                    },
                    {
                        "role_skill_id": 2,
                        "role_skill_name": "skill 2",
                        "course_id": "C1",
                        "course_name": "Course 1",
                        "course_desc": "Course 1 is on....",
                        "course_status": "Active",
                        "course_type": "Internal"
                    },
                    {
                        "role_skill_id": 2,
                        "role_skill_name": "skill 2",
                        "course_id": "C5",
                        "course_name": "Course 5",
                        "course_desc": "Course 5 is on....",
                        "course_status": "Active",
                        "course_type": "External"
                    },
                    {
                        "role_skill_id": 4,
                        "role_skill_name": "skill 4",
                        "course_id": "C5",
                        "course_name": "Course 5",
                        "course_desc": "Course 5 is on....",
                        "course_status": "Active",
                        "course_type": "External"
                    },
                    {
                        "role_skill_id": 5,
                        "role_skill_name": "skill 5",
                        "course_id": "C5",
                        "course_name": "Course 5",
                        "course_desc": "Course 5 is on....",
                        "course_status": "Active",
                        "course_type": "External"
                    },
                    {
                        "role_skill_id": 7,
                        "role_skill_name": "skill 7",
                        "course_id": "C5",
                        "course_name": "Course 5",
                        "course_desc": "Course 5 is on....",
                        "course_status": "Active",
                        "course_type": "External"
                    }
                ]
                const url = 'http://localhost:5005/api/getJourneyCourses/1';
                Axios.get.mockResolvedValueOnce(mockData)
                const result = await APIServices.getJourneyCoursesData("1")
 
                expect(Axios.get).toHaveBeenCalledWith(url)
                expect(Axios.get).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });
    describe('getJourney', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                const mockData = [
                    {
                        "journey_id": 1,
                        "staff_id": 1,
                        "role_id": 5,
                        "starred": 0
                    },
                    {
                        "journey_id": 3,
                        "staff_id": 1,
                        "role_id": 7,
                        "starred": 0
                    }
                ]
                const url = 'http://localhost:5005/api/getJourneys/140002';
                Axios.get.mockResolvedValueOnce(mockData)
                const result = await APIServices.getJourneyData(140002)

                expect(Axios.get).toHaveBeenCalledWith(url)
                expect(Axios.get).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });
    describe('getRole', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                const mockData = [
                    {
                        "role_id": 3,
                        "role_name": "r6",
                        "role_desc": "role 3....",
                        "role_status": "Active"
                    }
                ]
                const url = 'http://localhost:5005/api/getRole/3';
                Axios.get.mockResolvedValueOnce(mockData)
                const result = await APIServices.getRoleData(3)

                expect(Axios.get).toHaveBeenCalledWith(url)

                expect(Axios.get).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });
    // copy and paste start from here 
    describe('getCourse', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                // change the mockdata
                const mockData = [
                    {
                        "skill_id": 3,
                        "skill_name": "skill 3"
                    },
                    {
                        "skill_id": 6,
                        "skill_name": "skill 6"
                    }
                ]
                // change the url
                const url = 'http://localhost:5005/api/getCourseSkill/C6';
                Axios.get.mockResolvedValueOnce(mockData)
                // change the user input if need be
                const result = await APIServices.getCourseData("C6")
                expect(Axios.get).toHaveBeenCalledWith(url)
                expect(Axios.get).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });
    // to here
    describe('updateJourneyCourse', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                // change the mockdata
                const mockData = {"message" : "ok"}
            
                // change the url
                const url = 'http://localhost:5005/api/updateJourneyCourse';
                Axios.post.mockResolvedValueOnce(mockData)
                // change the user input if need be
                const result = await APIServices.updateJourneyCourse({"journey_id":"1", "courses": [ "COR001", "SAL004"]})
                expect(Axios.post).toHaveBeenCalledWith(url, {"courses": [ "COR001", "SAL004" ], "journey_id":"1"})
                expect(Axios.post).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });
    describe('updateHRRoleCard', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                // change the mockdata
                const mockData = {"message" : "ok"}
            
                // change the url
                const url = 'http://localhost:5005/api/deleteActiveRole';
                Axios.put.mockResolvedValueOnce(mockData)
                // change the user input if need be
                const result = await APIServices.updateHRRoleCard(4)
                console.log(result)
                expect(Axios.put).toHaveBeenCalledWith(url, {"role_id" : 4})
                expect(Axios.put).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });
    describe('getActiveCourses', () => {
        describe('with success', ()=> {
            it('should call axios get with given url', async () => {
                // change the mockdata
                const mockData = [
                    {
                        "course_id": "COR001",
                        "course_name": "Systems Thinking and Design",
                        "course_desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": 1,
                        "skill_ids": "[1, 2, 3]",
                        "skill_names": "[\"skill 1\", \"skill 2\", \"skill 3\"]",
                        "completion_status": null
                    },
                    {
                        "course_id": "COR002",
                        "course_name": "Lean Six Sigma Green Belt Certification",
                        "course_desc": "Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": "Completed"
                    },
                    {
                        "course_id": "FIN001",
                        "course_name": "Data Collection and Analysis",
                        "course_desc": "Data is meaningless unless insights and analysis can be drawn to provide useful information for business decision-making. It is imperative that data quality, integrity and security ",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": 5,
                        "skill_ids": "[5]",
                        "skill_names": "[\"skill 5\"]",
                        "completion_status": null
                    },
                    {
                        "course_id": "FIN002",
                        "course_name": "Risk and Compliance Reporting",
                        "course_desc": "Regulatory reporting is a requirement for businesses from highly regulated sectors to demonstrate compliance with the necessary regulatory provisions.",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "HRD001",
                        "course_name": "Leading and Shaping a Culture in Learning",
                        "course_desc": "This training programme, delivered by the National Centre of Excellence (Workplace Learning), aims to equip participants with the skills and knowledge of the National workplace learning certification framework,",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": 3,
                        "skill_ids": "[3]",
                        "skill_names": "[\"skill 3\"]",
                        "completion_status": null
                    },
                    {
                        "course_id": "MGT001",
                        "course_name": "People Management",
                        "course_desc": "enable learners to manage team performance and development through effective communication, conflict resolution and negotiation skills.",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "MGT002",
                        "course_name": "Workplace Conflict Management for Professionals",
                        "course_desc": "This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "MGT004",
                        "course_name": "Personal Effectiveness for Leaders",
                        "course_desc": "Learners will be able to acquire the skills and knowledge to undertake self-assessment in relation to one's performance and leadership style",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "SAL003",
                        "course_name": "Optimising Your Brand For The Digital Spaces",
                        "course_desc": "Digital has fundamentally shifted communication between brands and their consumers from a one-way broadcast to a two-way dialogue. In a hastened bid to transform their businesses to be digital market-ready,",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "SAL004",
                        "course_name": "Stakeholder Management",
                        "course_desc": "Develop a stakeholder engagement plan and negotiate with stakeholders to arrive at mutually-beneficial arrangements.",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": 1,
                        "skill_ids": "[1, 2, 4, 5, null]",
                        "skill_names": "[\"skill 1\", \"skill 2\", \"skill 4\", \"skill 5\", null]",
                        "completion_status": "Completed"
                    },
                    {
                        "course_id": "tch003",
                        "course_name": "Canon MFC Mainteance and Troubleshooting",
                        "course_desc": "Troubleshoot and fixing L2,3 issues of Canon ImageRUNNER series of products",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch005",
                        "course_name": "An Introduction to Sustainability",
                        "course_desc": "The course provides learners with the multi-faceted basic knowledge of sustainability.",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch008",
                        "course_name": "Technology Intelligence and Strategy",
                        "course_desc": "Participants will be able to gain knowledge and skills on: - establishing technology strategy with technology intelligence framework and tools",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch012",
                        "course_name": "Internet of Things",
                        "course_desc": "The Internet of Things (IoT) is integrating our digital and physical world, opening up new and exciting opportunities to deploy, automate, optimize and secure diverse use cases and applications. ",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch013",
                        "course_name": "Managing Cybersecurity and Risks",
                        "course_desc": "Digital security is the core of our daily lives considering that our dependence on the digital world",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch014",
                        "course_name": "Certified Information Privacy Professional",
                        "course_desc": "The Certified Information Privacy Professional/ Asia (CIPP/A) is the first publicly available privacy certification",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch015",
                        "course_name": "Network Security",
                        "course_desc": "Understanding of the fundamental knowledge of network security including cryptography, authentication and key distribution. The security techniques at various layers of computer networks are examined.",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch018",
                        "course_name": "Professional Project Management",
                        "course_desc": "solid foundation in the project management processes from initiating a project, through planning, execution, control,",
                        "course_status": "Active",
                        "course_type": "Internal",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    },
                    {
                        "course_id": "tch019",
                        "course_name": "Innovation and Change Management ",
                        "course_desc": "the organization that constantly reinvents itself to be relevant has a better chance of making progress",
                        "course_status": "Active",
                        "course_type": "External",
                        "skill_id": null,
                        "skill_ids": "[null]",
                        "skill_names": "[null]",
                        "completion_status": null
                    }
                ]
                // change the url
                const url = 'http://localhost:5005/api/getActiveCourses/140002';
                Axios.get.mockResolvedValueOnce(mockData)
                // change the user input if need be
                const result = await APIServices.getActiveCourses("140002")
                expect(Axios.get).toHaveBeenCalledWith(url)
                expect(Axios.get).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });
        });
    });
    describe('updateHRSkillCard', () => {
        describe('with success', ()=> {

            it('should call axios get with given url', async () => {
                // change the mockdata
                const mockData = {"message" : "ok"}
            
                // change the url
                const url = 'http://localhost:5005/api/deleteActiveSkill';
                Axios.put.mockResolvedValueOnce(mockData)
                // change the user input if need be
                const result = await APIServices.updateHRSkillCard(4)
                console.log(result)
                expect(Axios.put).toHaveBeenCalledWith(url, {"skill_id" : 4})
                expect(Axios.put).toHaveBeenCalledTimes(1)
                expect(result).toEqual(mockData)
            });

        });
    });

});

