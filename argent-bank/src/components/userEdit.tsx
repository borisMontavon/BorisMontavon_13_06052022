import { useAppDispatch } from "../app/hooks";
import { updateProfileAsync, setEditMode } from "../features/user/userSlice";

import { useState } from "react";

import PropTypes from "prop-types";

export function UserEdit({firstName, lastName, token}: {firstName: string, lastName: string, token: string}) {
    // Internal state of the component to grab the updated first and last name and send them to the API to be updated
    // Or to reset them if we cancel the operation
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [errorMessage, setErrorMessage] = useState(false);

    const dispatch = useAppDispatch();

    // Error message that check if both last and first names are not empty
    let inputsErrorMessage = null;

    // If names are not empty, we send the request to the API and update the state
    // Else we set the error check to true to be able to display it
    function updateProfile() {
        if (newFirstName !== "" && newLastName !== "") {
            dispatch(updateProfileAsync({firstName: newFirstName, lastName: newLastName, token: token}));
            setErrorMessage(false);
        } else {
            setErrorMessage(true);
        }
    }

    if (errorMessage) {
        inputsErrorMessage = <span className="edit-error">Please fill both first and last name</span>;
    } else {
        inputsErrorMessage = null;
    }

    return (
        <div className="edit-container">
            {inputsErrorMessage}
            <div className="edit-input-container">
                <input type="text" className="edit-input" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                <input type="text" className="edit-input" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
            </div>
            <div className="edit-button-container">
                <button className="edit-user-button" onClick={() => updateProfile()}>Save</button>
                <button className="edit-user-button" onClick={() => dispatch(setEditMode(false))}>Cancel</button>
            </div>
        </div>
    );
}

UserEdit.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
}
