import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { signUpPost } from "../../services/signUpPost"; 
import { ErrorState } from "../errorState";

// Type of the states
interface SignUpState extends ErrorState {
    isSuccessful: boolean,
    hasErrorMessage: boolean,
    errorMessage: string
}

// Default values of states
const initialState: SignUpState = {
    isSuccessful: false,
    hasErrorMessage: false,
    errorMessage: ""
};

// Middleware that asynchronoulsy is sending a POST request to the API and returning a status and informations
// Here we send all the informations needed to register a new user
export const signUpAsync = createAsyncThunk(
    'signUp',
    async ({email, password, firstName, lastName}: {email: string, password: string, firstName: string, lastName: string}) => {
      const response = await signUpPost({email, password, firstName, lastName});

      return response;
    }
);

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        setHasErrorMessage: (state, action: PayloadAction<boolean>) => {
            state.hasErrorMessage = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setIsSuccessful: (state, action: PayloadAction<boolean>) => {
            state.isSuccessful = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signUpAsync.fulfilled, (state, action) => {
            // Handle all the status case of the return value of the API
            // Update the state accordingly
            switch (action.payload.status) {
                case 200:
                    state.isSuccessful = true;
                    state.hasErrorMessage = false;
                    state.errorMessage = "";
                    break;
                case 400:
                    state.isSuccessful = false;
                    state.hasErrorMessage = true;
                    state.errorMessage = "Invalid fields";
                    break;
                case 500:
                case 501:
                    state.isSuccessful = false;
                    state.hasErrorMessage = true;
                    state.errorMessage = "Internal error";
                    break;
                default:
                    break;
            }
        });
    },
});

// Export of actions (reducer) that allow us to dispatch them
export const { setHasErrorMessage, setErrorMessage, setIsSuccessful } = signUpSlice.actions;

// Exports of the selector that allow us to access state
export const selectIsSuccessful = (state: RootState) => state.signUp.isSuccessful;
export const selectHasErrorMessage = (state: RootState) => state.signUp.hasErrorMessage;
export const selectErrorMessage = (state: RootState) => state.signUp.errorMessage;

// Export of the reducer for the store
export default signUpSlice.reducer;
