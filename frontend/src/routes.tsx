import Landing from "./pages/Landing";
import { createBrowserRouter } from "react-router";
import GuestLayout from "./components/layouts/GuestLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const routes = [
    {
        path: "/",
        Component: GuestLayout,
        children: [
            {
                path: "/",
                element: <Landing />,
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'password/forgot',
                element: <ForgotPassword />,
            },
            {
                path: 'password/reset?token={token}&email={email}',
                element: <ResetPassword />,
            }
        ]
    }
]

export const router = createBrowserRouter(routes)