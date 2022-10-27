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
    db.query("SELECT * FROM staff where staff_id = ?", staff_id, (err,result)=>{
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
        // console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

//Route to get one active skill
app.get("/api/getSkill/:skill_id", (req,res)=>{
    const skill_id = req.params.skill_id;
    db.query("SELECT * FROM skill WHERE skill_id = ?", skill_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to create skill
app.post('/api/createSkill', (req,res)=> {
    const skill_name = req.body.skill_name;
    const skill_desc = req.body.skill_desc;
    const skill_status = 'Active';

    db.query("INSERT INTO skill (skill_name, skill_desc, skill_status) VALUES (?,?,?)",[skill_name,skill_desc,skill_status], (err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    });
})

// Route to get all deleted skills
app.get("/api/getDeletedSkills", (req,res)=>{
    db.query("SELECT * FROM skill WHERE skill_status != 'Active'", (err,result)=>{
        // console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to recreate skill (previously deleted) --> updates the description and status
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
        // console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active job roles
app.get("/api/getActiveRoles/:staff_id", (req,res)=>{
    const staff_id = req.params.staff_id;
    db.query(`SELECT t1.*, journey_id FROM (
        SELECT t1.*, JSON_ARRAYAGG(s.skill_id) AS skill_ids, JSON_ARRAYAGG(s.skill_name) AS skill_names 
        FROM (
            SELECT jr.*, rs.skill_id FROM jobrole jr, roleskill rs
            WHERE jr.role_id = rs.role_id AND role_status = 'Active' 
            ) as t1
        LEFT JOIN skill s 
        ON t1.skill_id = s.skill_id AND skill_status = 'Active'
        GROUP BY t1.role_id
        ) as t1
        LEFT JOIN journey j 
        ON t1.role_id = j.role_id AND staff_id = ?`, staff_id, (err,result)=>{
        // console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to create job role (new)
app.post('/api/createRole', (req,res)=> {
    const role_name = req.body.role_name;
    const role_desc = req.body.role_desc;
    const role_status = 'Active';

    db.query("INSERT INTO jobrole (role_name, role_desc, role_status) VALUES (?,?,?)",[role_name,role_desc,role_status], (err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            db.query("SELECT role_id FROM jobrole WHERE role_name = ?", role_name, (err1,result1)=>{
                if(err1) {
                    console.log(err1)
                }
                else{
                    console.log(result1)
                    res.send(result1)
                }
            });
        }
    });
})

// Route to create role skills
app.post('/api/createRoleSkills', (req,res)=> {
    const role_id = req.body.role_id;
    const skills = req.body.skills; // list of skill ids

    skills.forEach(skill => {
        db.query("INSERT INTO roleskill (role_id, skill_id) VALUES (?,?)",[role_id, skill.value], (err,result)=>{
            if(err) {
                console.log(err)
            }
            else{
                console.log("insert success")
            }
        });
    });
})

// Route to get all skill ids and skill names related to selected role
app.get("/api/getRoleSkillsInfo/:role_id", (req,res)=>{
    const role_id = req.params.role_id;
    db.query(`SELECT s.* FROM roleskill rs, skill s WHERE rs.skill_id = s.skill_id AND 
            skill_status = 'Active' AND role_id = ?`, role_id, (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to recreate role skills
app.post('/api/recreateRoleSkills', (req,res)=> {
    const role_id = req.body.role_id;
    const skills = req.body.skills; // {value: skill_id, label: skill_name}

    db.query("DELETE FROM roleskill WHERE role_id = ?", role_id, (err1,result1)=>{
        if(err1) {
            console.log(err1)
        }
        else{
            console.log("success in deleting")
            // Step 2: Create (updated) skills related to the role
            skills.forEach(skill => {
                db.query("INSERT INTO roleskill (role_id, skill_id) VALUES (?,?)",[role_id, skill.value], (err2,result2)=>{
                    if(err2) {
                        console.log(err2)
                    }
                    else{
                        console.log("insert success")
                    }
                });
            });
        }
    })
})

// Route to get all deleted job roles
app.get("/api/getDeletedRoles", (req,res)=>{
    db.query("SELECT * FROM jobrole WHERE role_status != 'Active'", (err,result)=>{
        // console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to create role (previously deleted) --> updates the everything except id and name of role
app.post('/api/updateDeletedRole', (req,res)=> {
    const role_id = req.body.role_id;
    const role_desc = req.body.role_desc;

    db.query("UPDATE jobrole SET role_desc = ?, role_status = 'Active' WHERE role_id = ?",[role_desc,role_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route to get all job roles
app.get("/api/getAllRoles", (req,res)=>{
    db.query("SELECT * FROM jobrole", (err,result)=>{
        // console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active courses
app.get("/api/getActiveCourses/:staff_id", (req,res)=>{
    const staff_id = req.params.staff_id;
    db.query(`SELECT t1.*, completion_status FROM (
            SELECT t1.*, JSON_ARRAYAGG(s.skill_id) AS skill_ids, JSON_ARRAYAGG(s.skill_name) AS skill_names 
                FROM (
                    SELECT c.*, cs.skill_id FROM course c
                    LEFT JOIN courseskill cs
                    ON c.course_id = cs.course_id
                    WHERE course_status = 'Active'
                ) as t1
                LEFT JOIN skill s 
            on t1.skill_id = s.skill_id AND skill_status = 'Active'
            GROUP BY t1.course_id
            ) as t1
            LEFT JOIN registration r 
            ON t1.course_id = r.course_id AND staff_id = ?`, staff_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
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

// Route to get active skills (skill_ids, skill_names) from one course
app.get("/api/getCourseSkill/:course_id", (req,res)=>{
    const course_id = req.params.course_id;
    db.query("SELECT skill_id, skill_name from skill WHERE skill_id IN (SELECT skill_id FROM courseskill WHERE course_id = ?) AND skill_status = 'Active'", course_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to create course skill
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

// Route to get one active job role
app.get("/api/getActiveRole/:role_id", (req,res)=>{
    const role_id = req.params.role_id;
    db.query(`SELECT t1.*, JSON_ARRAYAGG(s.skill_id) AS skill_ids, JSON_ARRAYAGG(s.skill_name) AS skill_names 
            FROM (
                SELECT jr.*, rs.skill_id FROM jobrole jr, roleskill rs
                WHERE jr.role_id = rs.role_id AND role_status = 'Active' 
                ) as t1
            LEFT JOIN skill s 
            ON t1.skill_id = s.skill_id AND skill_status = 'Active'
            WHERE t1.role_id = ?`, role_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active skills (skill_ids) related to selected role
app.get("/api/getRoleSkills/:role_id", (req,res)=>{
    const role_id = req.params.role_id;
    db.query("SELECT rs.skill_id FROM roleskill rs, skill s WHERE rs.skill_id = s.skill_id AND skill_status = 'Active' AND role_id = ?", role_id, (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active courses (course_ids) related to selected skill
app.get("/api/getSkillCourses/:skill_id", (req,res)=>{
    const skill_id = req.params.skill_id;
    db.query("SELECT cs.course_id FROM courseskill cs, course c WHERE cs.course_id = c.course_id AND course_status = 'Active' AND skill_id = ?", skill_id, (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to create journey
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

// Route to create journey courses
app.post('/api/createJourneyCourses', (req,res)=> {
    const journey_id = req.body.journey_id;
    const courses = req.body.courses; //list of course_ids

    courses.forEach(course_id => {
        db.query("INSERT INTO journeycourse (journey_id, course_id) VALUES (?,?)",[journey_id,course_id], (err,result)=>{
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
    const stmt = `SELECT DISTINCTROW * FROM (
                SELECT skills.skill_id as role_skill_id, skills.skill_name as role_skill_name, course_id, 
                course_name, course_desc, course_status, course_type FROM (
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
                course_name, course_desc, course_status, course_type FROM (
                    SELECT s.skill_id, skill_name FROM skill s, roleskill rs WHERE role_id = 
                        (SELECT role_id FROM journey WHERE journey_id = ?) AND s.skill_id=rs.skill_id
                    ) AS skills
                RIGHT JOIN (
                    SELECT c.course_id, course_name, course_desc, course_status, course_type, s.skill_id, 
                    skill_name FROM courseskill cs, journeycourse jc, course c, skill s
                        WHERE cs.course_id = jc.course_id AND c.course_id = jc.course_id AND cs.skill_id=s.skill_id 
                        AND journey_id = ? AND c.course_id NOT IN (
                            SELECT DISTINCT IFNULL(course_id,"") FROM (
                                SELECT s.skill_id, skill_name FROM skill s, roleskill rs WHERE role_id = 
                                    (SELECT role_id FROM journey WHERE journey_id = ?) AND s.skill_id=rs.skill_id
                                ) AS skills
                            LEFT JOIN (
                                SELECT c.course_id, s.skill_id FROM courseskill cs, journeycourse jc, course c, skill s
                                    WHERE cs.course_id = jc.course_id AND c.course_id = jc.course_id AND cs.skill_id=s.skill_id AND journey_id = ?
                                ) as courses
                            ON skills.skill_id=courses.skill_id )
                    ) as courses
                ON skills.skill_id=courses.skill_id) as new_table 
                ORDER BY ISNULL(role_skill_id), role_skill_id ASC`
    db.query(stmt, [journey_id, journey_id, journey_id, journey_id, journey_id, journey_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Route to get all active courses grouped by active skills
app.get("/api/getGroupedSkillCourses", (req,res)=>{
    db.query(`SELECT s.*, JSON_ARRAYAGG(c.course_id) AS course_ids, JSON_ARRAYAGG(c.course_name) AS course_names, 
            JSON_ARRAYAGG(c.course_desc) AS course_desc  
            FROM course c, courseskill cs, skill s 
            WHERE c.course_id = cs.course_id AND cs.skill_id = s.skill_id AND skill_status = 'Active' AND course_status = 'Active' 
            GROUP BY s.skill_id`, (err,result)=>{
        if(err) {
            console.log(err)
        }
        else{
            res.send(result)
        }        
    });
});

// Route to delete a journey course
app.delete('/api/deleteJourneyCourse/:journey_id/:course_id',(req,res)=>{
    const journey_id = req.params.journey_id;
    const course_id = req.params.course_id;

    db.query("DELETE FROM journeycourse WHERE journey_id = ? AND course_id = ?", [journey_id, course_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        // else{
        //     res.send(result)
        // }
    }) 
})

// Route for updating skill
app.put('/api/updateActiveSkill', (req,res)=> {
    const skill_id = req.body.skill_id;
    const skill_name = req.body.skill_name;
    const skill_desc = req.body.skill_desc;

    db.query("UPDATE skill SET skill_name = ?, skill_desc = ? WHERE skill_id = ?",[skill_name,skill_desc,skill_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        // else{
        //     console.log("Success! \n", result)
        // }
    });
})

// Route for updating active role
app.put('/api/updateActiveRole', (req,res)=> {
    const role_id = req.body.role_id;
    const role_name = req.body.role_name;
    const role_desc = req.body.role_desc;

    db.query("UPDATE jobrole SET role_name = ?, role_desc = ? WHERE role_id = ?",[role_name,role_desc,role_id], (err,result)=>{
        if(err) {
            console.log(err)
        }
        // else{
        //     console.log("Success! \n", result)
        // }
    });
})

// Route to update status of skill to deleted
app.put('/api/deleteActiveSkill',(req,res)=>{
    const skill_id = req.body.skill_id;

    db.query("UPDATE skill SET skill_status = 'Deleted' WHERE skill_id = ?", skill_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
        // else{
        //     res.send(result)
        // }
    }) 
})

// Route to update status of role to deleted
app.put('/api/deleteActiveRole',(req,res)=>{
    const role_id = req.body.role_id;

    db.query("UPDATE jobrole SET role_status = 'Deleted' WHERE role_id = ?", role_id, (err,result)=>{
        if(err) {
            console.log(err)
        }
    }) 
})






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