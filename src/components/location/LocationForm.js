import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/LocationProvider";
import "./Location.css";
import { useNavigate, useParams } from 'react-router-dom';

export const LocationForm = () => {
  const { addLocation, getLocationById, updateLocation } = useContext(LocationContext);

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.

  Define the intial state of the form inputs with useState()
  */

  const [location, setLocation] = useState({ name: "" });
  const { locationId } = useParams();

  const navigate = useNavigate();


  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newLocation = { ...location };
    /* Location is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newLocation[event.target.id] = event.target.value;
    // update state
    setLocation(newLocation);
  }

  const handleClickSaveLocation = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    
    //invoke addLocation passing location as an argument.
    //once complete, change the url and display the location list
    if (locationId) {
      updateLocation(location)
      .then(() => navigate(`/locations/detail/${locationId}`));
    } else {
      addLocation(location)
      .then(() => navigate("/locations"));
    }
  }

  useEffect(() => {
    if (locationId) {
      getLocationById(locationId).then(setLocation);
    }
  }, []);

  return (
    <form className="locationForm">
      <h2 className="locationForm__title">New Location</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location name:</label>
          <input value={location.name} type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Location name" value={location.name}/>
        </div>
      </fieldset>
      <button className="btn btn-primary"
        onClick={handleClickSaveLocation}>
        Save Location
      </button>
    </form>
  );
}
