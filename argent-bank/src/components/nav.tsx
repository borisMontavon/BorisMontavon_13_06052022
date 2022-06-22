import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserFirstName, resetUser, profileAsync } from "../features/user/userSlice";
import { resetToken, selectToken } from "../features/token/tokenSlice";
import { setIsSuccessful } from "../features/signUp/signUpSlice";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut, faUserCircle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/argentBankLogo.png";
import { useEffect } from "react";

export function Nav() {
    // State from Redux to display the error message, or to navigate to the next page if login is successful
    const user: string = useAppSelector(selectUserFirstName);
    const token: string = useAppSelector(selectToken);

    const dispatch = useAppDispatch();

    // This function reset the user firstname, lastname, token and logged state
    // Called when already signed in and when the button "Sign out" is clicked
    function logOut() {
        dispatch(resetUser());
        dispatch(resetToken());
        dispatch(setIsSuccessful(false));
    }

    // Fetch the user informations thanks to the token previously saved
    useEffect(() => {
        async function getData() {
            if (token) {
                dispatch(profileAsync(token));
            }
        }

        getData();
    }, [dispatch, token]);

    let logButton;
    let profilButton;
    let signUpButton;

    // If the login is successful, we render the name of the user and the "Sign out" button that will allow us to log out
    if (token) {
        signUpButton = undefined;
        profilButton = <Link className="main-nav-item" to="/user"><FontAwesomeIcon icon={faUserCircle} className="main-nav-item-logo" />{user}</Link>;
        logButton = <Link className="main-nav-item" to="/" onClick={logOut}><FontAwesomeIcon icon={faSignOut} className="main-nav-item-logo" />Sign out</Link>
    // Else, we render the same "Sign in" button and the "Sign up" button that will allow us to create a new user if necessary
    } else {
        signUpButton = <Link className="main-nav-item" to="/signUp"><FontAwesomeIcon icon={faUserPlus} className="main-nav-item-logo" />Sign up</Link>
        profilButton = undefined;
        logButton = <Link className="main-nav-item" to="/login"><FontAwesomeIcon icon={faSignIn} className="main-nav-item-logo" />Sign in</Link>
    }

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div className="main-nav-items">
                {signUpButton}
                {profilButton}
                {logButton}
            </div>
        </nav>
    );
}
