document.addEventListener("DOMContentLoaded", function () {
  const employeeListContainer = document.getElementById("employee-list");


  
  function renderEmployeeList() {
      
      let employees = JSON.parse(localStorage.getItem("empList")) || [];

      // Clear the employee list container before rendering
      employeeListContainer.innerHTML = "";

      employees.forEach((employee, index) => {
          // Create a div for each employee
          const employeeDiv = document.createElement("div");
          employeeDiv.classList.add("emp-home-emp1"); // Same class as before

          // Construct inner HTML based on the expected structure
          employeeDiv.innerHTML = `
              <div class="reg-emp-name reg-name center">
                  <div style="width: 20%;">
                      <img src="${employee.profileImage}" alt="Profile Image">
                  </div>
                  <div style="width: 78%;">
                      <p>${employee.name}</p>
                  </div>
              </div>
              <div class="reg-emp-gender reg-gender center">${employee.gender}</div>
              <div class="reg-emp-dept reg-dept center">
                  ${employee.department.map(dept => `<div class="dept">${dept}</div>`).join('')}
              </div>
              <div class="reg-emp-salary reg-salary center">$${employee.salary}</div>
              <div class="reg-emp-start-date reg-start-date center">
                ${typeof employee.startDate === "object" 
                ? `${employee.startDate.day} ${employee.startDate.month} ${employee.startDate.year}`
                : employee.startDate} 
              </div>
              <div class="reg-emp-actions reg-actions center">
                  <img src="../assets/deleteIcon.png" alt="Delete" class="action-icon delete" data-index="${index}">
                  <img src="../assets/editIcon.webp" alt="Edit" class="action-icon edit" data-index="${index}">
              </div>
          `;

          // Append the employee entry to the container
          employeeListContainer.appendChild(employeeDiv);
      });
  }

  // Call render function on page load
  renderEmployeeList();
});
