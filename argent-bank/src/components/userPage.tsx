import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserFirstName, selectUserLastName, selectErrorMessage, selectHasErrorMessage, profileAsync, selectEditMode, setEditMode, selectIsTokenValid } from "../features/user/userSlice";
import { selectToken } from "../features/token/tokenSlice";
import { useEffect } from "react";
import { AccountSection } from "./accountSection";
import { UserEdit } from "./userEdit";
import { Navigate } from "react-router-dom";

export function UserPage() {
    // Get the state of the token to be able to get the user data by API
    const token: string = useAppSelector(selectToken);

    // Get the state of the editMode to check if we have to render the button or the inputs
    const isEditMode: boolean = useAppSelector(selectEditMode);

    // Check if the API wasn't successful, and display the error message
    const profileErrorMessage: string = useAppSelector(selectErrorMessage);
    const profileHasErrorMessage: boolean = useAppSelector(selectHasErrorMessage);
    const isTokenValid: boolean = useAppSelector(selectIsTokenValid);
    
    // Get first and last name from the state to display it
    const firstName: string = useAppSelector(selectUserFirstName);
    const lastName: string = useAppSelector(selectUserLastName);

    const dispatch = useAppDispatch();

    // Fetch the user informations thanks to the token previously saved
    useEffect(() => {
        async function getData() {
            dispatch(profileAsync(token));
        }

        getData();
    }, [dispatch, token]);

    // On the "Edit Name" button click, we set the edit mode to true to render the inputs component
    function handleDisplayEdit() {
        dispatch(setEditMode(true));
    }

    if (!isTokenValid) {
        return (
            <Navigate to="/logout" />
        );
    }

    if (isEditMode) {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back !</h1>
                </div>
                <UserEdit firstName={firstName} lastName={lastName} token={token} />
                <h2 className="sr-only">Accounts</h2>
                <AccountSection />
            </main>
        )
    }

    if (profileHasErrorMessage) {
        return (
            <main className="main bg-dark">
                <span className="profile-internal-error">{profileErrorMessage}</span>
                <h2 className="sr-only">Accounts</h2>
                <AccountSection />
            </main>
        )
    }

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button" onClick={() => handleDisplayEdit()}>Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            <AccountSection />
        </main>
    );
}
