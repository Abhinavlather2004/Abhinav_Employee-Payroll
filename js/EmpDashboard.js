document.addEventListener("DOMContentLoaded", function () {
    const employeeListContainer = document.getElementById("employee-list");
    const searchBox = document.getElementById("search-box");
  
    function renderEmployeeList(searchQuery = "") {
      let employees = JSON.parse(localStorage.getItem("empList")) || [];
  
      // Filter employees based on search query
      const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      // Clear the employee list container before rendering
      employeeListContainer.innerHTML = "";
  
      filteredEmployees.forEach((employee, index) => {
        // Create a div for each employee
        const employeeDiv = document.createElement("div");
        employeeDiv.classList.add("emp-home-emp1");
  
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
  
      // Attach delete & edit event listeners after rendering
      attachEventListeners();
    }
  
    function attachEventListeners() {
      const deleteButtons = document.querySelectorAll(".delete");
      const editButtons = document.querySelectorAll(".edit");
  
      deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          deleteEmployee(index);
        });
      });
  
      editButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const index = this.getAttribute("data-index");
          editEmployee(index);
        });
      });
    }
  
    function deleteEmployee(index) {
      let employees = JSON.parse(localStorage.getItem("empList")) || [];
  
      // Remove employee at the given index
      employees.splice(index, 1);
  
      // Update localStorage
      localStorage.setItem("empList", JSON.stringify(employees));
  
      // Re-render employee list
      renderEmployeeList(searchBox.value);
    }
  
    function editEmployee(index) {
      let employees = JSON.parse(localStorage.getItem("empList")) || [];
      const employee = employees[index];
  
      // Store selected employee index in localStorage
      localStorage.setItem("editEmpIndex", index);
      localStorage.setItem("editEmpData", JSON.stringify(employee));
  
      // Redirect to the registration page to edit
      window.location.href = "./EmpRegister.html";
    }
  
    // Event listener for search input
    searchBox.addEventListener("input", function () {
      renderEmployeeList(this.value);
    });
    
  
    // Call render function on page load
    renderEmployeeList();
  });
  