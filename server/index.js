const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
const connectDB = require("./config/db");

const bodyParser = require("body-parser");

// database connection
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middileware
app.use(express.json({ extended: false }));
app.use(cors());

// index route
app.get('/', (req, res) => {
    res.send('Server up and running')
})

// routes
app.use("/colleges", require("./routes/collegeRoute"));
app.use("/country", require("./routes/countryRoute"));


// console message of server listening
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})








// //-----------
// /*
// Schema of College :
// Id
// Name
// Year founded
// City
// State
// Country
// No of students
// Courses  (Computer science, Electronics, IT..etc)
// */
// const College = require("./models/College");
// var name="College1";
// var yearFounded="1999-12-26";
// var city="City1";
// var state="State1";
// var country="Country1";
// var noOfStudents= 500;
// var courses= ["Computer Science", "Electronics", "IT", "Mechanical"] 
// const collegeData = new College({
//     name,
//     yearFounded,
//     state,
//     country,
//     noOfStudents,
//     courses
//   });

//   /*
// Schema of Student :
// Id
// Name
// Year of batch
// College_Id
// Skills (C++, Java, C,...etc)
// */
//   const Student = require("./models/Student");
//   var name="Student1";
//   var yearOfBatch=2022;
//   var collegeId="611378fc6c4b8f2bb46a1b5b";
//   var skills= ["Java", "Web Development", "Machine Learning"] 
//   const studentData = new Student({
//       name,
//       yearOfBatch,
//       collegeId,
//       country,
//       skills,
//     });  
