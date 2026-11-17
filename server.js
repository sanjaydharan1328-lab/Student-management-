
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Add Student
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// View All Students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Student
app.delete("/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
