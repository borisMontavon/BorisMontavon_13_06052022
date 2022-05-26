import { HOST } from "../config/hostConfig";
import { Routes } from "../config/routeConfig";

// Type of the result returning from the "fetch" function
type ResponseData = {
    status: number;
    message: string;
    body: {
        id: string;
        email: string;
    };
}

// We send all the informations needed to register a new user
// If datas are correct, we return the result sent by the API (status 200)
// If not, we return the error status (400/500)
export async function signUpPost({email, password, firstName, lastName}: {email: string, password: string, firstName: string, lastName: string}) {
    try {
        const response = await fetch(HOST + Routes.SIGNUP_ROUTE, {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                firstName,
                lastName
            }),
            headers: {
                "Content-Type": "application/json"
            }
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
                id: "",
                email: ""
            }
        };
    }
}
