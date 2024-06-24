import React from 'react'
import "./EmployeeDisplay.css";
import EmployeeCard from './EmployeeCard';
import { Button } from "react-bootstrap";

function EmployeeDisplay({  userEmployee ,handleUserClick ,handleAddEmployeeButton ,handleSerchEmployee ,handleClear }) {
    return (
        <div >
            <div className="button-section  d-flex  align-items-center justify-content-between">
                <div>
                <Button variant="primary" className="btn btn-sm btn-primary" onClick={handleAddEmployeeButton} >
                    Add Employee
                 </Button>
                </div>
                <div >
                  <form>
                  <span className="pe-2">Search : </span>
                    <input className="search-employee" placeholder="Enter Name " onChange={handleSerchEmployee} />
                    <input className="btn btn-outline-primary btn-sm  mb-2 ms-3" type="reset" value="Clear"  onClick={handleClear}/> 
                  </form>
                </div>
                             
            </div>
            <div className="employee-cards-section border  pt-2  ">

                { (userEmployee.length == 0  ) &&  <p className="text-danger m-1">No Employee To Display ....</p> }

            { (userEmployee.length > 0 )&&
               userEmployee.map( (item) => (
                    <EmployeeCard  user={item} key={item.id} id={item.id} onClick={ () => handleUserClick(item.id)}/>
                ))
            }
            </div>
        </div>
    )
}

export default EmployeeDisplay
