import React, { useContext, useEffect } from "react";
import { CustomerContext } from "./CustomerProvider";
import { CustomerCard } from "./CustomerCard";
import "./Customer.css";

export const CustomerList = () => {
  // This state changes when `getCustomers()` is invoked below
  const { customers, getCustomers } = useContext(CustomerContext);

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("CustomerList: useEffect - getCustomers")
    getCustomers()

  }, []);


  return (
    <>
      <h2>Customers</h2>
      <div className="customers">
        {console.log("CustomerList: Render", customers)}
        {
          customers.map(customer => {
            return <CustomerCard key={customer.id} customer={customer} />
          })
        }
      </div>
    </>
  );
}