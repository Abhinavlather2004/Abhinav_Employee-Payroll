document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const errorMsg = document.createElement("p");
    errorMsg.style.color = "red";
    errorMsg.style.fontWeight = "bold";
    errorMsg.style.display = "none";
    form.prepend(errorMsg);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let empList = JSON.parse(localStorage.getItem("empList")) || [];

        let employeeData = {
            name: document.getElementById("form-name").value.trim(),
            profileImage: document.querySelector("input[name='profile']:checked")?.value || "",
            gender: document.querySelector("input[name='gender']:checked")?.value || "",
            department: Array.from(document.querySelectorAll("input[name='department']:checked"))
                .map(input => input.value),
            salary: document.getElementById("salary").value,
            startDate: `${document.getElementById("day").value} ${document.getElementById("month").value} ${document.getElementById("year").value}`,
            notes: document.getElementById("notes").value.trim()
        };

        // Validate required fields
        if (!employeeData.name || !employeeData.profileImage || !employeeData.gender || 
            employeeData.department.length === 0 || !employeeData.salary || 
            !document.getElementById("day").value || !document.getElementById("month").value || 
            !document.getElementById("year").value) {
            
            errorMsg.textContent = "⚠ Please fill out all required fields before submitting.";
            errorMsg.style.display = "block";
            return;
        } else {
            errorMsg.style.display = "none"; 
        }

        empList.push(employeeData);
        localStorage.setItem("empList", JSON.stringify(empList));

        alert("Form submitted successfully! Redirecting to dashboard...");
        form.reset();

        // Redirect to dashboard
        window.location.href = "EmpDashboard.html";
    });
});