import { HOST } from "../config/hostConfig";

type Data = {
    email: string;
    password: string;
}

// {email, password}: {email: BodyInit, password: BodyInit}

// export async function loginPost(data: Data) {
//     fetch((HOST + "/user/login"), {
//         method: "POST",
//         headers: {
//             "content-type": "application/json"
//         },
//         body: data
//     })
//     .then(response => console.log(response))
//     .catch(err => console.log(err))
// }

export async function loginPost({email, password}: {email: string, password: string}) {
    try {
        const response = await fetch(HOST + "/user/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "content-type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
        }

        const result = (await response.json()) as Data;

        console.log("result is: ", JSON.stringify(result, null, 4));

        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.log('error message: ', error.message);

            return error.message;
        } else {
            console.log('unexpected error: ', error);

            return 'An unexpected error occurred';
        }
    }
}
