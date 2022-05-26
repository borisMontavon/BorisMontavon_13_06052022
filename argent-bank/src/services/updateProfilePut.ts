import { HOST } from "../config/hostConfig";
import { Routes } from "../config/routeConfig";

// Type of the result returning from the "fetch" function
type ResponseData = {
    status: number;
    message: string;
    body: {
        email: string,
        firstName: string,
        lastName: string,
        createdAt: string,
        updatedAt: string,
        id: string
    };
}

// We send the token saved previously and check if it is correct
// If yes, the user informations (firstname, lastname, email...) are sent by the API (status 200)
// If not, error status are sent back (status 400/500)
export async function updateProfilePut({firstName, lastName, token}: {firstName: string, lastName: string, token: string}) {
    try {
        const response = await fetch(HOST + Routes.PROFILE_ROUTE, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName,
                lastName
            }),
        });

        const result = (await response.json()) as ResponseData;

        console.log("result is: ", JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        // Another case of error, if database is not running or disconnected during the process for example
        console.log('unexpected error: ', error);

        return {
            status: 501,
            message: "Sorry bro",
            body: {
                email: "",
                firstName: "",
                lastName: "",
                createdAt: "",
                updatedAt: "",
                id: ""
            }
        };
    }
}
