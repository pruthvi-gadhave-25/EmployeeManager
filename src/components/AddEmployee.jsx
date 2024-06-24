import React, { useState, useId, useEffect  } from 'react'
import Select from "react-select" ;
import { Modal, Button } from 'react-bootstrap';
import { addEmployee, updateEmployee, Designations, Departments } from '../Services';
import { v4 as uuidv4 } from 'uuid';
import "./AddEmployee.css"

const initialEmployee = {
    id: '',
    name: "",
    email : '' ,
    designation: "",
    department: '',
    mobileNo: ""
}
const initialSelectedOption = {
    value : null ,
    label : null 
}

function AddEmployee({ handleClose, show, checkIsSaved, selectedEmployee, isEdit, checkIsUpdate, handleDelete }) {


    const [employee, setEmployee] = useState(initialEmployee);
    const [selectedDepartment ,setSelectedDepartment] =  useState(initialSelectedOption) ;
    const [selectedDesignation ,setSelectedDesignation] =  useState(initialSelectedOption) ;

    useEffect(() => {
         if (isEdit && selectedEmployee) {
            setEmployee(selectedEmployee);
            setSelectedDepartment({ value: selectedEmployee.department, label: selectedEmployee.department });
            setSelectedDesignation({ value: selectedEmployee.designation, label: selectedEmployee.designation });
            console.log("hit");
            
     
        } else {
            setEmployee(initialEmployee);
            setSelectedDepartment(initialSelectedOption);
            setSelectedDesignation(initialSelectedOption);
        }
    }, [isEdit, selectedEmployee]);

    const handleChange = (e) => {

        const { name, value } = e.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSelectedChange = (option )  =>{
      console.log(option);
      
        setSelectedOption(option.value) ;
    
    }

    const handleDesignationChange = (option )  =>{
          setSelectedDesignation(option) ;
          debugger ;
      }

      const handleDepartmentChange = (option )  =>{
          setSelectedDepartment(option) ;
          debugger ;
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEdit) {
            const newId = uuidv4();
            const newEmployee = {
                id: newId,
                email : employee.email ,
                name: employee.name,
                department : selectedDepartment.value,
                designation: selectedDesignation.value,
                mobileNo: employee.mobileNo
            }
            addEmployee(newEmployee);
            checkIsSaved();
        }
        else {
            const updatedEmployee = {
                id: selectedEmployee.id,
                email : employee.email ,
                name: employee.name,
                designation: selectedDesignation.value,
                department : selectedDepartment.value ,
                mobileNo: employee.mobileNo
            }
            updateEmployee(selectedEmployee.id, updatedEmployee);
            checkIsUpdate();
        }

        handleClose();
        setEmployee(initialEmployee);
    }
    return (      
        <>
            <Modal show={show} onHide={handleClose}  id="EmployeeModal">
                <Modal.Header closeButton>
                    <Modal.Title>{`${isEdit ? "Edit Employee" : "Add Employee "}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mx-2">
                    <form className="employee-form " >
                        <div className="row">
                            <div className="form-group text-muted p-1 ">
                                <label htmlFor="name " className="mb-1">Full Name</label>
                                <input
                                    className="w3-input"
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={employee.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                        <div className="form-group p-1 col-6 text-muted  ">
                                <label htmlFor="email" className="mb-1">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={employee.email}
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group text-muted  p-1 col-6">
                                <label htmlFor="mobileNo" className="mb-1">Mobile No</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={employee.mobileNo}
                                    name="mobileNo"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group text-muted  p-1 col-6">
                                <label htmlFor="designation" className="mb-1">Designation</label>                               
                                 <Select  
                                 options={Designations}
                                 value={selectedDesignation}
                                 onChange ={handleDesignationChange}
                                 />
                            </div>
                            <div className="form-group text-muted  p-1 col-6">
                                <label htmlFor="department" className="mb-1">Department</label>
                                <Select 
                                    options={Departments}
                                    value={selectedDepartment}
                                    onChange ={handleDepartmentChange}
                               />
                            </div>
                        </div>
                       

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    {
                        isEdit && (
                            <Button variant="danger" onClick={handleDelete}>
                                Delete
                            </Button>
                        )
                    }
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    {
                        isEdit ? (
                            <Button variant="primary" onClick={handleSubmit} >
                                Update
                            </Button>

                        ) :
                            (
                                <Button variant="primary" onClick={handleSubmit} >
                                    Save
                                </Button>
                            )
                    }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddEmployee;
