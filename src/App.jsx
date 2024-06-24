import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import FilterSection from './components/FilterSection'
import EmployeeDisplay from './components/EmployeeDisplay'
import AddEmployee from './components/AddEmployee'
import { getEmployees, deleteEmployee } from './Services'

const initialEmployee = {
  id: '',
  name: "",
  email: '',
  designation: "",
  department: "",
  mobileNo: ""
}

function App() {

  const [show, setShow] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [originalEmployees, setOriginalEmployees] = useState([]);
  const [userEmployee, setUserEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmplyee] = useState(initialEmployee);
  const [isEdit, setIsEdit] = useState(false);
  const [isUpadte, setIsUpdate] = useState(false);
  const [isDelete, setisDelete] = useState(false);
  const [isFiltered, setisFiltered] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const checkIsSaved = () => setIsSaved(true);
  const checkIsUpdate = () => setIsUpdate(true);
  const checkIsUpdateFalse = () => setIsUpdate(false);


  useEffect(() => {
    const data = getEmployees();
    setUserEmployee(data);
    setOriginalEmployees(data);
  }, []);


  useEffect(() => {
    const data = getEmployees();
    setUserEmployee(data);
    setOriginalEmployees(data);
  }, [isSaved, isUpadte, isDelete, isFiltered,])



  const handleAddEmployeeButton = () => {
    handleShow();
    setIsEdit(false);
  }


  //openForm for   edit data 
  const handleUserClick = (empId) => {
    setIsEdit(true);
    let allEmployees = originalEmployees;
    const selectedEmployee = allEmployees.find(item => item.id == empId);
    setSelectedEmplyee(selectedEmployee);
    handleShow();
    checkIsUpdateFalse();
    setisDelete(false);
  }

  const handleDelete = () => {

    setisDelete(true);
    handleClose();
    deleteEmployee(selectedEmployee.id);
  }

  //find Employee by Search input by Name 
  const handleSerchEmployee = (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim() === '') {
      setUserEmployee(originalEmployees);
      return userEmployee;
    }
    else {
      const filterUsers = filterEmployeeByName(inputValue); //find by Name

      setUserEmployee(filterUsers);
    }

  }


  const filterEmployeeByName = (inputValue) => {

    const filteredData = originalEmployees.filter(item =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    console.log("filterdData ", filteredData);
    return filteredData;
  }


  const handleFilterdSection = (inputValue) => {
   if (inputValue.toLowerCase().trim() === '') {
      setUserEmployee(originalEmployees);
      return userEmployee;
    }
    else {
      const filterUsers = filterEmployeeDesignation(inputValue); //find by Name
      setUserEmployee(filterUsers);
    }
  }
  const filterEmployeeDesignation = (inputValue) => {
    const filteredData = originalEmployees.map(item =>
      (item.designation.toLowerCase().includes(inputValue.toLowerCase()) ? item : null)
    ).filter(item => item != null)
    return filteredData;
  }

  //////////////////
  const handleFilterdSectionDepartment = (inputValue) => {
    console.log(inputValue);
    

    if (inputValue.toLowerCase().trim() === '') {
       setUserEmployee(originalEmployees);
       return userEmployee;
     }
     else {
       const filterUsers = filterEmployeeDepartment(inputValue); //find by Name
       setUserEmployee(filterUsers);
     }
   }
   const filterEmployeeDepartment = (inputValue) => {
  
     const filteredData = originalEmployees.map(item =>
       (item.department.toLowerCase().includes(inputValue.toLowerCase()) ? item : null)
     ).filter(item => item != null)
     return filteredData;
   }

   //claer Inouts search and filters 
   const  handleClear =() => {
 setUserEmployee(originalEmployees);
   }
 

  return (
    < >
      <Header />
      <AddEmployee
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        checkIsSaved={checkIsSaved}
        checkIsUpdate={checkIsUpdate}
        isSaved={isSaved}
        selectedEmployee={selectedEmployee}
        handleDelete={handleDelete}
        isEdit={isEdit}
      />
      <div className="main-section">
        <FilterSection
          handleFilterdSection={handleFilterdSection}
          handleFilterdSectionDepartment={handleFilterdSectionDepartment}
        />
        <EmployeeDisplay
          handleShow={handleShow}
          handleClear={handleClear}
          userEmployee={userEmployee}
          handleUserClick={handleUserClick}
          handleSerchEmployee={handleSerchEmployee}
          handleAddEmployeeButton={handleAddEmployeeButton} />
      </div>
    </>
  )
}

export default App;
