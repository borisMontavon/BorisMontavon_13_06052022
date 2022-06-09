import { HOST } from "../config/hostConfig";
import { Routes } from "../config/routeConfig";

// Type of the result returning from the "fetch" function
type ResponseData = {
    status: number;
    message: string;
    body: {
        token: string;
    };
    remember: boolean;
}

// We send the email and the password the user typed in the login fields
// If datas match in the database, we return the result sent by the API (status 200)
// If not, we return the error status (400/500)
export async function loginPost({email, password}: {email: string, password: string}) {
    try {
        const response = await fetch(HOST + Routes.LOGIN_ROUTE, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const result = (await response.json()) as ResponseData;

        return result;
    } catch (error) {
        // Another case of error, if database is not running or disconnected during the process for example
        console.log('unexpected error: ', error);

        return {
            status: 501,
            message: "Sorry bro",
            body: {
                token: ""
            },
            remember: false
        };
    }
}
