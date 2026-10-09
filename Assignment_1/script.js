const form = document.getElementById("resultForm");
const report = document.getElementById("report");
const savedStudents = document.getElementById("savedStudents");

displaySavedStudents();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const roll = document.getElementById("rollNumber").value.trim();
    const course = document.getElementById("course").value.trim();

    const webValue = document.getElementById("web").value;
    const databaseValue = document.getElementById("database").value;
    const programmingValue = document.getElementById("programming").value;

    if (!name || !roll || !course || !webValue || !databaseValue || !programmingValue) {
        alert("Please enter all student details and marks.");
        return;
    }

    const web = Number(webValue);
    const database = Number(databaseValue);
    const programming = Number(programmingValue);

    if (web < 0 || web > 100 || database < 0 || database > 100 ||
        programming < 0 || programming > 100) {
        alert("Each subject mark must be between 0 and 100.");
        return;
    }

    const totalMarks = web + database + programming;
    const percentage = totalMarks / 3;
    const result = (web >= 35 && database >= 35 && programming >= 35) ? "Pass" : "Fail";

    const studentData = {
        studentName: name,
        rollNumber: roll,
        course: course,
        subjects: [
            { name: "Web Technology", marks: web },
            { name: "Database Management", marks: database },
            { name: "Programming", marks: programming }
        ],
        totalMarks: totalMarks,
        percentage: percentage.toFixed(2),
        result: result
    };

    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(studentData);
    localStorage.setItem("students", JSON.stringify(students));

    showResult(studentData);
    displaySavedStudents();
    form.reset();

    console.log("Student Object:", studentData);
    console.log("JSON Data:", JSON.stringify(studentData));
});

function showResult(student) {
    document.getElementById("showName").textContent = student.studentName;
    document.getElementById("showRoll").textContent = student.rollNumber;
    document.getElementById("showCourse").textContent = student.course;
    document.getElementById("showTotal").textContent = student.totalMarks + " / 300";
    document.getElementById("showPercentage").textContent = student.percentage + "%";

    const status = document.getElementById("showStatus");
    status.textContent = student.result;
    status.className = student.result === "Pass" ? "pass" : "fail";

    report.style.display = "block";
}

function displaySavedStudents() {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    if (students.length === 0) {
        savedStudents.innerHTML = "<p>No students saved yet.</p>";
        return;
    }

    savedStudents.innerHTML = "";

    students.forEach(function(student, index) {
        const item = document.createElement("div");
        item.className = "saved-item";

        item.innerHTML = `
            <p><b>${index + 1}. ${student.studentName}</b></p>
            <p>Roll No: ${student.rollNumber}</p>
            <p>Percentage: ${student.percentage}% | Result: ${student.result}</p>
        `;

        savedStudents.appendChild(item);
    });
}
