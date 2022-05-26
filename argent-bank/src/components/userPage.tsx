import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserFirstName, selectUserLastName, profileAsync, selectEditMode, setEditMode } from "../features/user/userSlice";
import { selectToken } from "../features/token/tokenSlice";

import { useEffect } from "react";

import { AccountSection } from "./accountSection";
import { UserEdit } from "./userEdit";

export function UserPage() {
    // Get the state of the token to be able to get the user data by API
    const token: string = useAppSelector(selectToken);
    // Get the state of the editMode to check if we have to render the button or the inputs
    const isEditMode: boolean = useAppSelector(selectEditMode);

    const dispatch = useAppDispatch();

    // Fetch the user informations thanks to the token previously saved
    useEffect(() => {
        async function getData() {
            dispatch(profileAsync(token));
        }

        getData();
    }, [dispatch, token]);

    // Get first and last name from the state to display it
    const firstName: string = useAppSelector(selectUserFirstName);
    const lastName: string = useAppSelector(selectUserLastName);

    // On the "Edit Name" button click, we set the edit mode to true to render the inputs component
    function handleDisplayEdit() {
        dispatch(setEditMode(true));
    }

    const accountsData = [
        {
            "title": "Argent Bank Checking (x8349)",
            "amount": "$2,082.79",
            "description": "Available Balance"
        },
        {
            "title": "Argent Bank Savings (x6712)",
            "amount": "$10,928.42",
            "description": "Available Balance"
        },
        {
            "title": "Argent Bank Credit Card (x8349)",
            "amount": "$184.30",
            "description": "Current Balance"
        }
    ];

    const accounts = accountsData.map((account, index) =>
        <AccountSection accountTitle={account.title} accountAmount={account.amount} accountAmountDescription={account.description} key={index} />
    );

    if (isEditMode) {
        return (
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back !</h1>
                </div>
                <UserEdit firstName={firstName} lastName={lastName} token={token} />
                <h2 className="sr-only">Accounts</h2>
                {accounts}
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
            {accounts}
        </main>
    );
}
