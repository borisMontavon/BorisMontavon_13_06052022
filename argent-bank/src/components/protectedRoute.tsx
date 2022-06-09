import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectToken } from "../features/token/tokenSlice";

export function ProtectedRoute({children}: {children: JSX.Element}) {
    // Get the state of the token to be able to get the user data by API
    const token: string = useAppSelector(selectToken);

    if (!token || !token.length) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
