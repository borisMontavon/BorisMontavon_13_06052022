import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

interface UserState {
    // Export nécessaire ?
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: "loggedIn" | "loggedOut";
}

const initialState: UserState = {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    password: "password123",
    status: "loggedOut"
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
            state.status = "loggedIn";
        },
        resetUserName: (state) => {
            state.firstName = "";
            state.status = "loggedOut";
        }
    },
});

export const { setUserName, resetUserName } = userSlice.actions;

export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;
export const selectUserMail = (state: RootState) => state.user.email;
export const selectUserPassword = (state: RootState) => state.user.password;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectLogginButton = (state: RootState) => state.user.status === "loggedIn" ? "Sign out" : "Sign in";

export default userSlice.reducer;
