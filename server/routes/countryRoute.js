const express = require("express");
const router = express.Router();
const College = require("../models/College");

// get count of colleges in different states in a country
router.get("/states", async (req, res) => {
    
    const country = req.query.country;
    let stateMap = new Map([]);
    // query for counting colleges in each states of a country
    College.find(async(err, request) => {
        if(err){
            return res.status(400).json({ errors: [{ msg: err.message }] });
        }else{
            await request.map(college=>{
                if(college.country===country){
                    // if map has this state, increase count
                    if(stateMap.has(college.state)){
                        stateMap.set(college.state, stateMap.get(college.state)+1);
                    } else {
                        // if map does not have this state, add this state with count 1
                        stateMap.set(college.state, 1);
                    }
                }
            });

            // convert state map to array
            stateMap =[...stateMap];
            data=[]
            // push type(state name) and value(colleges count) in array
            stateMap.map(item=>{
                data.push({"type":item[0], "value":item[1]})
            })
            // return data
            res.status(200).json({data});
        }
    });
})

// get count of colleges in different courses in a country
router.get("/courses", async (req, res) => {
    
    const country = req.query.country;
    let courseMap = new Map([]);
    // query for counting colleges in each course of a country
    College.find(async(err, request) => {
        if(err){
            return res.status(400).json({ errors: [{ msg: err.message }] });
        }else{
            await request.map(college=>{
                if(college.country===country){
                    college.courses.map(course=>{
                        // if map has this course, increase count
                        if(courseMap.has(course)){
                            courseMap.set(course, courseMap.get(course)+1);
                        } else {
                            // if map does not have this course, add this course with count 1
                            courseMap.set(course, 1);
                        }
                    })
                }
            });

            // convert course map to array
            courseMap =[...courseMap];
            data=[]
            // push type(course name) and value(colleges count) in array
            courseMap.map(item=>{
                data.push({"type":item[0], "value":item[1]})
            })
            // return data
            res.status(200).json({data});
        }
    });
})



// get list of colleges in a states of a country
router.get("/exploreState", async (req, res) => {
    
    const state = req.query.state;
    const country = req.query.country;
    let colleges = []
    // query for geting list of colleges in a states of a country
    College.find(async(err, request) => {
        if(err){
            return res.status(400).json({ errors: [{ msg: err.message }] });
        }else{
            // pushing colleges in array
            await request.map(college=>{
                if(college.country===country && college.state===state){
                    const {_id,name,city, state, country, year_founded, no_of_students, courses} = college;
                    colleges.push({_id,name, city, state, country, year_founded, no_of_students, courses})
                }
            });
            // if no college found, return no college message
            if(colleges.length==0){
                return res.status(400).json("No colleges found");
            }
            // return data
            res.status(200).json({request: colleges});
        }
    });
})



// get list of colleges with a course of a country
router.get("/exploreCourse", async (req, res) => {
    
    const course = req.query.course;
    const country = req.query.country;
    let colleges = []
    // query for getting list of colleges with a course of a country
    College.find(async(err, request) => {
        if(err){
            return res.status(400).json({ errors: [{ msg: err.message }] });
        }else{
            // pushing colleges in array
            await request.map(college=>{
                if(college.country===country&& college.courses.includes(course)){
                    const {_id,name,city, state, country, year_founded, no_of_students, courses} = college;
                    colleges.push({_id,name, city, state, country, year_founded, no_of_students, courses})
                }
            });
            // if no college found, return no college message
            if(colleges.length==0){
                return res.status(400).json("No colleges found");
            }
            // return data
            res.status(200).json({request: colleges});
        }
    });
})


module.exports = router;