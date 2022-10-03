const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database:"spm" 
})

const  PORT = 5005;

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req,res)=>{
    console.log("HELLO WORLD")
});

// Route to get staff user type ---> to determine which header to show
app.get("/api/getUserType/:staff_id", (req,res)=>{
    const staff_id = req.params.staff_id;
    db.query("SELECT user_type FROM staff where staff_id = ?", staff_id, (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active skills
app.get("/api/getActiveSkills", (req,res)=>{
    db.query("SELECT * FROM skill WHERE skill_status = 'Active'", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating skill
app.post('/api/createSkill', (req,res)=> {
    const skill_name = req.body.skill_name;
    const skill_desc = req.body.skill_desc;
    const skill_status = 'Active';

    db.query("INSERT INTO skill (skill_name, skill_desc, skill_status) VALUES (?,?,?)",[skill_name,skill_desc,skill_status], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route to get all deleted skills
app.get("/api/getDeletedSkills", (req,res)=>{
    db.query("SELECT * FROM skill WHERE skill_status != 'Active'", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating skill (previously deleted) --> updates the description and status
app.post('/api/updateDeletedSkill', (req,res)=> {
    const skill_id = req.body.skill_id;
    const skill_desc = req.body.skill_desc;

    db.query("UPDATE skill SET skill_desc = ?, skill_status = 'Active' WHERE skill_id = ?",[skill_desc,skill_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route to get all skills
app.get("/api/getAllSkills", (req,res)=>{
    db.query("SELECT * FROM skill", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active job roles
app.get("/api/getActiveRoles", (req,res)=>{
    db.query("SELECT * FROM jobrole WHERE role_status = 'Active'", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating job role (new)
app.post('/api/createRole', (req,res)=> {
    const role_name = req.body.role_name;
    const role_desc = req.body.role_desc;
    const role_responsibilities = req.body.role_responsibilities;
    const role_status = 'Active';

    db.query("INSERT INTO jobrole (role_name, role_desc, role_responsibilities, role_status) VALUES (?,?,?,?)",[role_name,role_desc,role_responsibilities,role_status], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route to get all deleted job roles
app.get("/api/getDeletedRoles", (req,res)=>{
    db.query("SELECT * FROM jobrole WHERE role_status != 'Active'", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating role (previously deleted) --> updates the everything except id and name of role
app.post('/api/updateDeletedRole', (req,res)=> {
    const role_id = req.body.role_id;
    const role_desc = req.body.role_desc;
    const role_responsibilities = req.body.role_responsibilities;

    db.query("UPDATE role SET role_desc = ?, role_responsibilities = ?, role_status = 'Active' WHERE role_id = ?",[role_desc,role_responsibilities,role_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route to get all job roles
app.get("/api/getAllRoles", (req,res)=>{
    db.query("SELECT * FROM jobrole", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active courses
app.get("/api/getActiveCourses", (req,res)=>{
    db.query("SELECT * FROM course WHERE course_status = 'Active'", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get one course
app.get("/api/getCourse/:course_id", (req,res)=>{
    const course_id = req.params.course_id;
    db.query("SELECT * FROM course WHERE course_id = ?", course_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating course skill
app.post('/api/createCourseSkills', (req,res)=> {
    const course_id = req.body.course_id;
    const skills = req.body.skills; //list of skill_ids

    // Step 1: Clear all courseSkills related to the courses
    db.query("DELETE FROM courseskill WHERE course_id = ?", course_id, (err1,result1)=>{
        if(err1) {
            console.log(err1)
        }
        else{
            console.log("success in deleting")
            // Step 2: Create (new) courseSkills related to the courses
            skills.forEach(skill_id => {
                db.query("INSERT INTO courseskill (course_id, skill_id) VALUES (?,?)",[course_id,skill_id], (err2,result2)=>{
                    if(err2) {
                        console.log(err2)
                    }
                    console.log("Success! \n", result2)
                });
            });
            
        }
    })
})

// Route to get one job role
app.get("/api/getRole/:role_id", (req,res)=>{
    const role_id = req.params.role_id;
    db.query("SELECT * FROM jobrole WHERE role_id = ?", role_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all skills related to selected role
app.get("/api/getRoleSkills/:role_id", (req,res)=>{
    const role_id = req.params.role_id;
    db.query("SELECT skill_id FROM roleskill WHERE role_id = ?", role_id, (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all courses related to selected skill
app.get("/api/getSkillCourses/:skill_id", (req,res)=>{
    const skill_id = req.params.skill_id;
    db.query("SELECT course_id FROM courseskill WHERE skill_id = ?", skill_id, (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route for creating journey
app.post('/api/createJourney', (req,res)=> {
    const staff_id = req.body.staff_id;
    const role_id = req.body.role_id;

    db.query("INSERT INTO journey (staff_id, role_id) VALUES (?,?)",[staff_id,role_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route for creating journey courses
app.post('/api/createJourneyCourses', (req,res)=> {
    const journey_id = req.body.journey_id;
    const courses = req.body.courses; //list of course_ids

    courses.forEach(course_id => {
        db.query("INSERT INTO journey (journey_id, course_id) VALUES (?,?)",[journey_id,course_id], (err,result)=>{
            if(err) {
                console.log(err)
            }
            console.log("Success! \n", result)
        });
    });
})

// Route to get all journeys of a staff
app.get("/api/getJourneys/:staff_id", (req,res)=>{
    const staff_id = req.params.staff_id;
    db.query("SELECT * FROM journey WHERE staff_id = ?", staff_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get journey courses for selected journey
app.get("/api/getJourneyCourses/:journey_id", (req,res)=>{
    const journey_id = req.params.journey_id;
    const stmt = `SELECT skills.skill_id as role_skill_id, skills.skill_name as role_skill_name, course_id, 
                course_name, course_desc, course_status, course_type, courses.skill_id as course_skill_id, 
                courses.skill_name as course_skill_name FROM (
                    SELECT s.skill_id, skill_name FROM skill s, roleskill rs WHERE role_id = 
                        (SELECT role_id FROM journey WHERE journey_id = ?) AND s.skill_id=rs.skill_id
                    ) AS skills
                LEFT JOIN (
                    SELECT c.course_id, course_name, course_desc, course_status, course_type, s.skill_id, 
                    skill_name FROM courseskill cs, journeycourse jc, course c, skill s
                        WHERE cs.course_id = jc.course_id AND c.course_id = jc.course_id AND cs.skill_id=s.skill_id 
                        AND journey_id = ?
                    ) as courses
                ON skills.skill_id=courses.skill_id
                UNION ALL
                SELECT skills.skill_id as role_skill_id, skills.skill_name as role_skill_name, course_id, 
                course_name, course_desc, course_status, course_type, courses.skill_id as course_skill_id, 
                courses.skill_name as course_skill_name FROM (
                    SELECT s.skill_id, skill_name FROM skill s, roleskill rs WHERE role_id = 
                        (SELECT role_id FROM journey WHERE journey_id = ?) AND s.skill_id=rs.skill_id
                    ) AS skills
                RIGHT JOIN (
                    SELECT c.course_id, course_name, course_desc, course_status, course_type, s.skill_id, 
                    skill_name FROM courseskill cs, journeycourse jc, course c, skill s
                        WHERE cs.course_id = jc.course_id AND c.course_id = jc.course_id AND cs.skill_id=s.skill_id 
                        AND journey_id = ?
                    ) as courses
                ON skills.skill_id=courses.skill_id`
    db.query(stmt, [journey_id, journey_id,journey_id, journey_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// // Route to get courses related to skill that are added for selected journey
// app.get("/api/getJourneySkillCourses/:journey_id/:skill_id", (req,res)=>{
//     const journey_id = req.params.journey_id;
//     const skill_id = req.params.skill_id;
//     const stmt = `SELECT * FROM course WHERE course_id in (
//                         SELECT course_id FROM courseskill WHERE skill_id = ?
//                     ) AND course_id in (
//                         SELECT course_id FROM journeycourse WHERE journey_id = ?
//                     )`
//     db.query(stmt, [skill_id, journey_id], (err,result)=>{
//         if(err) {
//             console.log(err)
//         }
//         res.send(result)
//     });
// });

// // Route to get other courses that are added for selected journey (not related to the skills of the role)
// app.get("/api/getJourneyOtherCourses/:journey_id", (req,res)=>{
//     const journey_id = req.params.journey_id;
//     const skill_id = req.params.skill_id;
//     const stmt = `SELECT * FROM course WHERE course_id in (
//                         SELECT course_id FROM courseskill WHERE skill_id = ?
//                     ) AND course_id in (
//                         SELECT course_id FROM journeycourse WHERE journey_id = ?
//                     )`
//     db.query(stmt, [skill_id, journey_id], (err,result)=>{
//         if(err) {
//             console.log(err)
//         }
//         res.send(result)
//     });
// });



// // Route for creating the post
// app.post('/api/create', (req,res)=> {
//     const username = req.body.userName;
//     const title = req.body.title;
//     const text = req.body.text;

//     db.query("INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)",[title,text,username], (err,result)=>{
//         if(err) {
//         console.log(err)
//         }
//         console.log(result)
//     });
// })

// // Route to like a post
// app.post('/api/like/:id',(req,res)=>{

// const id = req.params.id;
// db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   } 
//    console.log(result)
//     });    
// });

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})