
import React from 'react' ;
function ListElement({name ,onClick} ) {    
    return (
        <>
         <li  onClick={onClick}>{name}  </li>
        </>
    )
}

export default ListElement
