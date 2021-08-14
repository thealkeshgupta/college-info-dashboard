const mongoose = require("mongoose");
/*
Schema of College :
Id
Name
Year_founded
City
State
Country
No_of_students
Courses  (Computer science, Electronics, IT..etc)
*/
const CollegeSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    year_founded: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    no_of_students:{
        type: Number,
    },
    courses: [{
        type: String
    }]
});

module.exports = College = mongoose.model("college", CollegeSchema);
