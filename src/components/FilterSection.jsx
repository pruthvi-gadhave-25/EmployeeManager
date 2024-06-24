import React from 'react'
import "./FilterSection.css";
import { Departments, Designations } from '../Services';
import ListElement from './ListElement';
function FilterSection( {handleFilterdSection ,handleFilterdSectionDepartment }) {

    
    return (
        <div>
          <div className="filter-modules border-right pt-4">
                <div>
                <h6 className="ms-4">Department</h6>
                <ul>
                 {
                     Departments.map( item => (
                        <ListElement name={item.label}  onClick={ () =>handleFilterdSectionDepartment(item.value) } value={item.value} />
                     ))
                 }
                </ul>
                </div >

                <div className="">
                <h6 className="ms-4">Designations</h6>
                <ul className="">
                {
                       Designations.map( item => (
                        <li onClick={ () =>handleFilterdSection(item.value)} value={item.value}>{item.label}</li>
                        ))
                }
                </ul>
                </div>              
          </div>
        </div>
    )
}

export default FilterSection
