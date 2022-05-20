import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectUserFirstName, selectUserLastName, profileAsync } from "../features/user/userSlice";
import { selectToken } from "../features/token/tokenSlice";

import { useEffect } from "react";

import { AccountSection } from "./accountSection";

export function UserPage() {
    // Get the state of the token to be able to get the user data by API
    const token: string = useAppSelector(selectToken);

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

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts}
        </main>
    );
}
