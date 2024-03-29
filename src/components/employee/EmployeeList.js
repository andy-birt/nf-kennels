import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "./EmployeeProvider";
import { EmployeeCard } from "./EmployeeCard";
import "./Employee.css";
import { LocationContext } from "../location/LocationProvider";

export const EmployeeList = () => {
  const navigate = useNavigate();
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext);
  const { locations, getLocations } = useContext(LocationContext);

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getLocations().then(getEmployees)

  }, []);


  return (
    <>
      <h2>Employees</h2>
      <button onClick={() => {navigate('/employees/create')}}>
        Add Employee
      </button>
      <div className="employees">
        {console.log("EmployeeList: Render", employees)}
        {
          employees.map(employee => {
            const clinic = locations.find(l => l.id === employee.locationId);

            return <EmployeeCard key={employee.id}
                               employee={employee}
                               location={clinic} />
          })
        }
      </div>
    </>
  );
}