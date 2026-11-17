
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState("add");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [year, setYear] = useState("");
    const [loading, setLoading] = useState(false);

    const API = "http://localhost:5000/students";

    // Get Students
    const getStudents = async () => {
        const response = await fetch(API);
        const data = await response.json();
        setStudents(data);
    };

    useEffect(() => {
        getStudents();
    }, []);

    // Add Student
    const addStudent = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    department,
                    year: Number(year)
                })
            });

            if (!response.ok) {
                throw new Error("Unable to add student");
            }

            alert("Student Added Successfully!");

            setName("");
            setDepartment("");
            setYear("");

            await getStudents();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete Student
    const deleteStudent = async (id) => {
        if (!window.confirm("Delete this student?")) return;

        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        getStudents();
    };

    return (
        <div className="container">

            <h1>Student Management System</h1>

            <div className="tabs">
                <button onClick={() => setPage("add")}>
                    Add Student
                </button>

                <button onClick={() => {
                    setPage("view");
                    getStudents();
                }}>
                    View Students
                </button>
            </div>

            {page === "add" ? (
                <div className="form-box">
                    <h2>Add Student</h2>

                    <form onSubmit={addStudent}>

                        <label>Student Name</label>
                        <input
                            type="text"
                            placeholder="Enter student name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <label>Department</label>
                        <input
                            type="text"
                            placeholder="Enter department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                        />

                        <label>Year</label>
                        <input
                            type="number"
                            placeholder="Enter year (1-4)"
                            min="1"
                            max="4"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Student"}
                        </button>

                    </form>
                </div>
            ) : (
                <div className="student-list">
                    <h2>All Students</h2>

                    {students.map((student) => (
                        <div className="student-card" key={student._id}>
                            <h3>{student.name}</h3>
                            <p>
                                <b>Department:</b> {student.department}
                            </p>
                            <p>
                                <b>Year:</b> {student.year}
                            </p>

                            <button
                                className="delete-btn"
                                onClick={() => deleteStudent(student._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    {students.length === 0 && (
                        <p>No students found.</p>
                    )}
                </div>
            )}

        </div>
    );
}

export default App;
