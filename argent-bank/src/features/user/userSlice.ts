import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { profilePost } from "../../services/profilePost";
import { updateProfilePut } from "../../services/updateProfilePut";
import { ErrorState } from "../errorState";

// Type of the states
interface UserState extends ErrorState {
    firstName: string;
    lastName: string;
    editMode: boolean;
    isTokenValid: boolean;
}

// Default values of states
const initialState: UserState = {
    firstName: "",
    lastName: "",
    editMode: false,
    errorMessage: "",
    hasErrorMessage: false,
    isTokenValid: true
};

// Middleware that is asynchronoulsy sending a POST request to the API and returning a status and informations
// Here we need to check if the token is right
export const profileAsync = createAsyncThunk(
    'user/profile',
    async (token: string) => {
      const response = await profilePost(token);

      return response;
    }
);

// Middleware that is asynchronoulsy sending a PUT request to update the first and last name of the user
export const updateProfileAsync = createAsyncThunk(
    'user/updateProfile',
    async ({firstName, lastName, token}: {firstName: string, lastName: string, token: string}) => {
      const response = await updateProfilePut({firstName, lastName, token});

      return response;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.firstName = "";
            state.lastName = "";
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.editMode = action.payload;
        },
        setEditHasErrorMessage: (state, action: PayloadAction<boolean>) => {
            state.hasErrorMessage = action.payload;
        },
        resetTokenValidity: (state) => {
            state.isTokenValid = true;
        }
    },
    // Handle all the status case of the return value of the API
    // Update the state accordingly
    extraReducers: (builder) => {
        builder
        .addCase(profileAsync.fulfilled, (state, action) => {
            switch (action.payload.status) {
                case 200:
                    state.firstName = action.payload.body.firstName;
                    state.lastName = action.payload.body.lastName;
                    state.hasErrorMessage = false;
                    state.errorMessage = "";
                    state.isTokenValid = true;
                    break;
                case 401:
                    state.isTokenValid = false;
                    break;
                case 500:
                case 501:
                    state.hasErrorMessage = true;
                    state.errorMessage = "Internal Server Error";
                    break;
                default:
                    break;
            }
        })
        .addCase(profileAsync.rejected, (state) => {
            state.firstName = "";
            state.lastName = "";
        })
        .addCase(updateProfileAsync.fulfilled, (state, action) => {
            switch (action.payload.status) {
                case 200:
                    state.firstName = action.payload.body.firstName;
                    state.lastName = action.payload.body.lastName;
                    state.editMode = false;
                    state.hasErrorMessage = false;
                    state.errorMessage = "Please fill both first and last name";
                    break;
                case 400:
                    state.hasErrorMessage = true;
                    state.errorMessage = "Invalid fields";
                    break;
                case 500:
                case 501:
                    state.hasErrorMessage = true;
                    state.errorMessage = "Internal error";
                    break;
                default:
                    break;
            }
        })
        .addCase(updateProfileAsync.rejected, () => {
            console.log("Your profile update was rejected.");
        })
    },
});

// Export of actions (reducer) that allow us to dispatch them
export const { resetUser, setEditMode, setEditHasErrorMessage, resetTokenValidity } = userSlice.actions;

// Exports of the selector that allow us to access state
export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;
export const selectEditMode = (state: RootState) => state.user.editMode;
export const selectErrorMessage = (state: RootState) => state.user.errorMessage;
export const selectHasErrorMessage = (state: RootState) => state.user.hasErrorMessage;
export const selectIsTokenValid = (state: RootState) => state.user.isTokenValid;

// Export of the reducer for the store
export default userSlice.reducer;
