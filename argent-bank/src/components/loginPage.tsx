import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectErrorMessage, selectIsLoggedIn, selectHasErrorMessage, loginAsync, setHasErrorMessage } from "../features/token/tokenSlice";

import { useState, useEffect } from "react";

import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export function LoginPage() {
    // Internal state of the component, to handle the field value of inputs
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    // State from Redux to display the error message, or to navigate to the next page if login is successful
    const errorMessage: string = useAppSelector(selectErrorMessage);
    const isLoggedIn: boolean = useAppSelector(selectIsLoggedIn);
    const hasErrorMessage: boolean = useAppSelector(selectHasErrorMessage);

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

        dispatch(loginAsync({email: userName, password: password}));
    }

    // Login not successful, we display the error message depending on the error status we got back
    let displayErrorMessage;

    if (hasErrorMessage) {
        displayErrorMessage = <p className="sign-in-error">{errorMessage}</p>;
    } else {
        displayErrorMessage = null;
    }

    // Login successful
    if (isLoggedIn) {
        return (
            <Navigate to="/user" />
        );
    }

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faUserCircle} />
                <h1>Sign In</h1>
                {displayErrorMessage}
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button className="sign-in-button" type="submit">
                        Sign in
                    </button>
                </form>
            </section>
        </main>
    );
}
