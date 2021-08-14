const express = require("express");
const router = express.Router();
const College = require("../models/College");
const Student = require("../models/Student");

// get list of colleges
router.get("/", async (req, res) => {
    
    var colleges = []
    // making query to the database
    College.find(async(err, request) => {
        if(err){
            return res.status(400).json({ errors: [{ msg: err.message }] });
        }else{
            // pushing all colleges in array
            await request.map(college=>{
                const {_id,name,city, state,country, year_founded, no_of_students, courses} = college;
                colleges.push({_id,name, city, state, country, year_founded, no_of_students, courses})
            });
            if(colleges.length==0){
                return res.status(400).json("No colleges found");
            }
            res.status(200).json({request: colleges});
            colleges = [];
        }
    });
})



// find college by id 
router.get("/id", async (req, res) => {
    // checking valid object id for mongodb collection documents
    if (!req.query.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ errors: [{ msg: "invalid id" }] });
    }
    // query for finding college by id
    let college = await College.findById(req.query.id );
    // if college exists, return data
    if (college) {
        return res.status(200).json({request: college});
    } else {
        // else return invalid id message
        return res.status(400).json({ errors: [{ msg: "invalid id" }] });
    }
})


// find college by name 
router.get("/name", async (req, res) => {
    // query for finding college by name 
    let college = await College.findOne({ name: req.query.name });
    // if college exists return data
    if (college) {
        return res.status(200).json({request: college});
    } else {
        // else return no college message
        return res.status(400).json({ errors: [{ msg: "No college found with such name" }] });
    }
})


// get similar colleges
router.get("/similar", async (req, res) => {
    // query for finding college by id
    let college = await College.findOne({ _id: req.query.id });
    if (college) {
        const state = college.state;
        var students_count = college.no_of_students;
        const courses = college.courses;
        let colleges = []
        // query for finding similar colleges 
        College.find(async(err, request) => {
            if(err){
                return res.status(400).json({ errors: [{ msg: err.message }] });
            }else{
                // storing all similar colleges in array
                await request.map(college=>{
                    if(college.state===state && college.id!= req.query.id){
                        if(college.no_of_students<=(students_count+100) && college.no_of_students>=(students_count-100) ){
                            const commonCourses = college.courses.filter(value => courses.includes(value));
                            if(commonCourses!=null){
                                const {_id, name,city, state, country,year_founded, no_of_students} = college;
                                colleges.push({_id,name,city, state,country,year_founded, commonCourses ,no_of_students})
                            }
                        }
                    }
                });
                // if no similar colleges found return no similar colleges message
                if(colleges.length==0){
                    return res.status(400).json("No Similar Colleges Found");
                }
                // return data
                res.status(200).json({request: colleges});
            }
        });
    } else {
        // invalid id message
        return res.status(400).json({ errors: [{ msg: "Invalid id" }] });
    }
})




// get students list
router.get("/students", async (req, res) => {

    var college_id = req.query.college_id; 
    let students = []
    // query for finding students with given college id 
    Student.find(async(err, request) => {
        if(err){
            return res.status(400).json({ errors: [{ msg: err.message }] });
        }else{
            // pushing students in array
            await request.map(student=>{
                if(student.college_id===college_id){
                    const {_id, name,year_of_batch, college_id ,skills} = student;
                    students.push({_id, name,year_of_batch, college_id ,skills})
                }
            });
            // if no students found return no students message
            if(students.length==0){
                return res.status(400).json("No Students Found");
            }
            // return data
            res.status(200).json({request: students});
        }
    });
})

// export router
module.exports = router;