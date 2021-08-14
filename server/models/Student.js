const mongoose = require("mongoose");
/*
Schema of Student :
Id
Name
Year of batch
College_Id
Skills (C++, Java, C,...etc)
*/
const StudentSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    year_of_batch: {
        type: Number,
    },
    college_id: {
        type: String,
    },
    skills: [{
        type: String
    }]
});

module.exports = Student = mongoose.model("student", StudentSchema);
