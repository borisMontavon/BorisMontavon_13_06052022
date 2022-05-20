import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { profilePost } from "../../services/profilePost";

// Type of the states
interface UserState {
    firstName: string;
    lastName: string;
}

// Default values of states
const initialState: UserState = {
    firstName: "",
    lastName: ""
};

// Middleware that asynchronoulsy is sending a POST request to the API and returning a status and informations
// Here we need to check if the token is right
export const profileAsync = createAsyncThunk(
    'user/profile',
    async (token: string) => {
      const response = await profilePost(token);

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
            console.log(state.firstName);
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
                    break;
                case 400:
                    // state.isLoggedIn = false;
                    // state.token = "";
                    // state.hasErrorMessage = true;
                    // state.errorMessage = "Username or password invalid";
                    break;
                case 500:
                case 501:
                    // state.isLoggedIn = false;
                    // state.token = "";
                    // state.hasErrorMessage = true;
                    // state.errorMessage = "An error occured";
                    break;
                default:
                    break;
            }
        })
        .addCase(profileAsync.rejected, (state) => {
            state.firstName = "";
            state.lastName = "";
        });
    },
});

// Export of actions (reducer) that allow us to dispatch them
export const { resetUser } = userSlice.actions;

// Exports of the selector that allow us to access state
export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;

// Export of the reducer for the store
export default userSlice.reducer;
