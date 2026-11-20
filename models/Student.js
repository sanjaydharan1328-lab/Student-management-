
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1,
        max: 4
    }
});

module.exports = mongoose.model("Student", studentSchema);
