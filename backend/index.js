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

// Route to get all courses
app.get("/api/getCourses", (req,res)=>{
    db.query("SELECT * FROM course", (err,result)=>{
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

// Route to get all job roles
app.get("/api/getRoles", (req,res)=>{
    db.query("SELECT * FROM jobrole", (err,result)=>{
        console.log(result)
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

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

// Route for creating job role
app.post('/api/createRole', (req,res)=> {
    const role_name = req.body.role_name;
    const role_desc = req.body.role_desc;
    const role_responsibilities = req.body.role_responsibilities;
    const role_status = req.body.role_status;

    db.query("INSERT INTO jobrole (role_name, role_desc, role_responsibilities, role_status) VALUES (?,?,?,?)",[role_name,role_desc,role_responsibilities,role_status], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
    });
})

// Route to get all skills
app.get("/api/getSkills", (req,res)=>{
    db.query("SELECT * FROM skill", (err,result)=>{
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
    const skill_status = req.body.skill_status;

    db.query("INSERT INTO skill (skill_name, skill_desc, skill_status) VALUES (?,?,?)",[skill_name,skill_desc,skill_status], (err,result)=>{
        if(err) {
            console.log(err)
        }
        console.log("Success! \n", result)
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

// Route for creating course skill (need consider update also...)
app.post('/api/createCourseSkill', (req,res)=> {
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