import { useAppSelector, useAppDispatch } from "../app/hooks";
import { resetUserName, selectUserFirstName, selectLogginButton, selectUserStatus, setUserName } from "../features/user/userSlice";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/argentBankLogo.png";

export function Nav() {
    const user: string = useAppSelector(selectUserFirstName);
    const sign: string = useAppSelector(selectUserStatus);
    const logginButton: string = useAppSelector(selectLogginButton);
    const dispatch = useAppDispatch();

    let logButton;
    let profilButton;

    if (sign === "loggedIn") {
        logButton = <Link className="main-nav-item" to="/" onClick={() => dispatch(resetUserName())}><FontAwesomeIcon icon={faSignOut} className="main-nav-item-logo" />{logginButton}</Link>
        profilButton = <Link className="main-nav-item" to="/profil"><FontAwesomeIcon icon={faUserCircle} className="main-nav-item-logo" />{user}</Link>;
    } else {
        logButton = <Link className="main-nav-item" to="login" onClick={() => dispatch(setUserName("Tony"))}><FontAwesomeIcon icon={faSignIn} className="main-nav-item-logo" />{logginButton}</Link>
        profilButton = undefined;
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
            <div>
                {profilButton}
                {logButton}
            </div>
        </nav>
    );
}
