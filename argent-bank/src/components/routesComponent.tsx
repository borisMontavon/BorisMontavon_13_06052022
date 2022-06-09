import { Routes, Route } from "react-router-dom";
import { HomePage } from './homePage';
import { LoginPage } from './loginPage';
import { UserPage } from './userPage';
import { ErrorPage } from './errorPage';
import { SignUpPage } from './signUpPage';
import { ProtectedRoute } from "./protectedRoute";
import { LogOut } from "./logOut";
import { Nav } from "./nav";

export function RoutesComponent() {
    return (
        <Routes>
            <Route 
                path="/" 
                element={
                    <>
                        <Nav />
                        <HomePage />
                    </>
                } 
            />
            <Route
                path="/login"
                element={
                    <>
                        <Nav />
                        <LoginPage />
                    </>
                } 
            />
            <Route
                path="/signUp"
                element={
                    <>
                        <Nav />
                        <SignUpPage />
                    </>
                } 
            />
            <Route 
                path="/user" 
                element={
                    <>
                        <Nav />
                        <ProtectedRoute>
                            <UserPage />
                        </ProtectedRoute>
                    </>
                }
            />
            <Route path="/logout" element={<LogOut />} />
            <Route
                path="*"
                element={
                    <>
                        <Nav />
                        <ErrorPage />
                    </>
                } 
            />
      </Routes>
    );
}
