
let Employees = [];


//add Employee 
export function addEmployee(employee) {
    Employees.push(employee);
    saveEmployeesToLocalStorage();
}

//get Employee 
export const getEmployees = () => {
    loadEmployeesFromLocalStorage() ;
    return  Employees ;
}


//delete 
export const deleteEmployee = (id) => {
    Employees = Employees.filter(employee => employee.id !== id);
    saveEmployeesToLocalStorage();
}

//update 
export const updateEmployee = (id, updatedEmployee) => {
    Employees = Employees.map(employee => 
        employee.id === id ? { ...employee, ...updatedEmployee } : employee
    );
    saveEmployeesToLocalStorage();
}


//localStorage Methods 
const saveEmployeesToLocalStorage = () => {
    localStorage.setItem('employees', JSON.stringify(Employees));
}

export const loadEmployeesFromLocalStorage = () => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
        Employees = JSON.parse(storedEmployees);
    }
    else {
        return [] ;
    }
}


export const Departments = [
    { value: "Software Development", label: "Software Development" },
    { value: "Quality Assurance", label: "Quality Assurance" },
    { value: "IT Operations", label: "IT Operations" },
    { value: "DevOps", label: "DevOps" }
];

export const Designations = [
    { value: "Frontend Developer", label: "Frontend Developer" },
    { value: "Backend Developer", label: "Backend Developer" },
    { value: "QA Engineer", label: "QA Engineer" },
    { value: "Manual Tester", label: "Manual Tester" },
    { value: "DevOps Engineer", label: "DevOps Engineer" }
];