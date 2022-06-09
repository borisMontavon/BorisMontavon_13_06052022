import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { resetToken } from "../features/token/tokenSlice";
import { resetTokenValidity } from "../features/user/userSlice";

export function LogOut() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetToken());
        dispatch(resetTokenValidity());
    }, [dispatch])

    return (
        <Navigate to="/login" />
    )
}