import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import tokenReducer from "../features/token/tokenSlice";
import signUpReducer from "../features/signUp/signUpSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    signUp: signUpReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
