import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { loginPost } from "../../services/loginPost";

// Type of the states
interface TokenState {
    token: string;
    errorMessage: string;
    isLoggedIn: boolean;
    hasErrorMessage: boolean;
}

// Default values of states
const initialState: TokenState = {
    token: "",
    errorMessage: "",
    isLoggedIn: false,
    hasErrorMessage: false
};

// Middleware that asynchronoulsy is sending a POST request to the API and returning a status and informations
// Here we need to check if the email and the password typed in the form are matching in the database
export const loginAsync = createAsyncThunk(
    'token/login',
    async ({email, password}: {email: string, password: string}) => {
      const response = await loginPost({email, password});

      return response;
    }
);

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        resetToken: (state) => {
            state.token = "";
            state.isLoggedIn = false;
        },
        setHasErrorMessage: (state, action: PayloadAction<boolean>) => {
            state.hasErrorMessage = action.payload;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginAsync.fulfilled, (state, action) => {
            // Handle all the status case of the return value of the API
            // Update the state accordingly
            switch (action.payload.status) {
                case 200:
                    state.isLoggedIn = true;
                    state.token = action.payload.body.token;
                    break;
                case 400:
                    state.isLoggedIn = false;
                    state.token = "";
                    state.hasErrorMessage = true;
                    state.errorMessage = "Username or password invalid";
                    break;
                case 500:
                case 501:
                    state.isLoggedIn = false;
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
export const { setToken, resetToken, setHasErrorMessage, setIsLoggedIn } = tokenSlice.actions;

// Exports of the selector that allow us to access state
export const selectToken = (state: RootState) => state.token.token;
export const selectErrorMessage = (state: RootState) => state.token.errorMessage;
export const selectIsLoggedIn = (state: RootState) => state.token.isLoggedIn;
export const selectHasErrorMessage = (state: RootState) => state.token.hasErrorMessage;

// Export of the reducer for the store
export default tokenSlice.reducer;
