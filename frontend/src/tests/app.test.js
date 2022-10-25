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
    
});

