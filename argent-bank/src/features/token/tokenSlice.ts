import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginPost } from "../../services/loginPost";
import { ErrorState } from "../errorState";
import Cookies from 'universal-cookie';

// Type of the states
interface TokenState extends ErrorState {
    token: string;
}

const cookies = new Cookies();
const token = cookies.get("jwtToken");

// Default values of states
const initialState: TokenState = {
    token: token,
    errorMessage: "",
    hasErrorMessage: false
};

// Middleware that asynchronoulsy is sending a POST request to the API and returning a status and informations
// Here we need to check if the email and the password typed in the form are matching in the database
export const loginAsync = createAsyncThunk(
    'token/login',
    async ({email, password, remember}: {email: string, password: string, remember: boolean}) => {
      const response = await loginPost({email, password});
      
      response.remember = remember;

      return response;
    }
);

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        resetToken: (state) => {
            state.token = "";
            cookies.remove("jwtToken");
        },
        setHasErrorMessage: (state, action: PayloadAction<boolean>) => {
            state.hasErrorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAsync.fulfilled, (state, action) => {
            // Handle all the status case of the return value of the API
            // Update the state accordingly
            switch (action.payload.status) {
                case 200:
                    state.token = action.payload.body.token;

                    if (action.payload.remember) {
                        const date = new Date();

                        date.setDate(date.getDate() + 1);

                        cookies.set("jwtToken", state.token, { path: "/", expires: date });
                    } else {
                        cookies.set("jwtToken", state.token, { path: "/" });
                    }
                    break;
                case 400:
                    state.token = "";
                    state.hasErrorMessage = true;
                    state.errorMessage = "Username or password invalid";
                    break;
                case 500:
                case 501:
                    state.token = "";
                    state.hasErrorMessage = true;
                    state.errorMessage = "An error occured";
                    break;
                default:
                    break;
            }
        })
        .addCase(loginAsync.rejected, (state) => {
            state.token = "";
        });
    },
});

// Export of actions (reducer) that allow us to dispatch them
export const { resetToken, setHasErrorMessage } = tokenSlice.actions;

// Exports of the selector that allow us to access state
export const selectToken = (state: RootState) => state.token.token;
export const selectErrorMessage = (state: RootState) => state.token.errorMessage;
export const selectHasErrorMessage = (state: RootState) => state.token.hasErrorMessage;

// Export of the reducer for the store
export default tokenSlice.reducer;
