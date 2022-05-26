import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectIsSuccessful, selectErrorMessage, selectHasErrorMessage, setHasErrorMessage, setErrorMessage, signUpAsync } from "../features/signUp/signUpSlice";

import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export function SignUpPage() {
    // Internal state of the component, to handle the field value of inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // State from Redux to check if the sign up is successful
    const isSuccessful: boolean = useAppSelector(selectIsSuccessful);
    const hasErrorMessage: boolean = useAppSelector(selectHasErrorMessage);
    const errorMessage: string = useAppSelector(selectErrorMessage);

    const dispatch = useAppDispatch();

    // Update the state of hasErrorMessage, with the linked action, to false, to prevent the error message to display again
    useEffect(() => {
        async function dispatchSetHasErrorMessage() {
            dispatch(setHasErrorMessage(false));
        }

        dispatchSetHasErrorMessage();
    }, [dispatch]);

    // Function called when form is submitted
    // Callback : API POST function that return the status of the login
    function handleSubmit(e: React.SyntheticEvent): void {
        e.preventDefault();
        e.stopPropagation();

        if (userName !== "" && password !== "" && firstName !== "" && lastName !== "") {
            dispatch(signUpAsync({email: userName, password: password, firstName: firstName, lastName: lastName}));
        } else {
            dispatch(setHasErrorMessage(true));
            dispatch(setErrorMessage("Please fill all the fields"));
        }
    }

    // Login not successful, we display the error message depending on the error status we got back
    let displayErrorMessage;

    if (hasErrorMessage) {
        displayErrorMessage = <p className="sign-in-error">{errorMessage}</p>;
    } else {
        displayErrorMessage = null;
    }

    // Login successful
    if (isSuccessful) {
        return (
            <Navigate to="/login" />
        );
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserPlus} />
                <h1>Sign Up</h1>
                {displayErrorMessage}
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Firstname</label>
                        <input type="text" id="username" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="username">Lastname</label>
                        <input type="text" id="username" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="username">Email</label>
                        <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="sign-in-button" type="submit">
                        Sign up
                    </button>
                </form>
            </section>
        </main>
    );
}
