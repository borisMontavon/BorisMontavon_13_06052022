import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectEditErrorMessage, selectEditHasErrorMessage, updateProfileAsync, setEditMode, setEditHasErrorMessage } from "../features/user/userSlice";

import { useState } from "react";

import PropTypes from "prop-types";

export function UserEdit({firstName, lastName, token}: {firstName: string, lastName: string, token: string}) {
    // Internal state of the component to grab the updated first and last name and send them to the API to be updated
    // Or to reset them if we cancel the operation
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);

    // State from Redux to check if the update is successful
    const errorMessage: string = useAppSelector(selectEditErrorMessage);
    const hasErrorMessage: boolean = useAppSelector(selectEditHasErrorMessage);

    const dispatch = useAppDispatch();

    // Error message that check if both last and first names are not empty
    let inputsErrorMessage = null;

    // If names are not empty, we send the request to the API and update the state
    // Else we set the error check to true to be able to display it
    function updateProfile() {
        if (newFirstName !== "" && newLastName !== "") {
            dispatch(updateProfileAsync({firstName: newFirstName, lastName: newLastName, token: token}));
        } else {
            dispatch(setEditHasErrorMessage(true));
        }
    }

    if (hasErrorMessage) {
        inputsErrorMessage = <span className="edit-error">{errorMessage}</span>;
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
