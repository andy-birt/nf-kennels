import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/LocationProvider";
import { EmployeeContext } from "../employee/EmployeeProvider";
import "./Employee.css";
import { useNavigate, useParams } from 'react-router-dom';

export const EmployeeForm = () => {
  const { addEmployee, updateEmployee, getEmployeeById } = useContext(EmployeeContext);
  const { locations, getLocations } = useContext(LocationContext);
  const { employeeId } = useParams();
  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the intial state of the form inputs with useState()
  */

  const [employee, setEmployee] = useState({
    name: "",
    locationId: 0
  });

  const navigate = useNavigate();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */
  useEffect(() => {
    getLocations().then(() => {
      if (employeeId) {
        getEmployeeById(employeeId).then(setEmployee)
      }
    });
  }, []);

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee };
    /* Employee is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    // newEmployee.name || newEmployee.locationId
    // newEmployee['name'] || newEmployee['locationId']
    // If the value is able to be parsed to integer then go ahead and set that to the state otherwise leave it as string
    newEmployee[event.target.id] = parseInt(event.target.value) ? parseInt(event.target.value) : event.target.value;
    // update state
    setEmployee(newEmployee);
  }

  const handleClickSaveEmployee = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    const locationId = parseInt(employee.locationId);

    if (locationId === 0) {
      window.alert("Please select a location");
    } else {
      //invoke addEmployee passing employee as an argument.
      //once complete, change the url and display the employee list

      if (employeeId) {
        updateEmployee(employee)
        .then(() => navigate(`/employees/detail/${employeeId}`));
      } else {
        addEmployee(employee)
        .then(() => navigate("/employees"));
      }
    }
  }

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:</label>
          <input value={employee.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Employee name" value={employee.name}/>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select value={employee.locationId} onChange={handleControlledInputChange} name="locationId" id="locationId" className="form-control" >
            <option value="0">Select a location</option>
            {locations.map(l => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={handleClickSaveEmployee}>
        Save Employee
      </button>
    </form>
  );
}
