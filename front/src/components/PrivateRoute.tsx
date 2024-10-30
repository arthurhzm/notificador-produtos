import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Routes from "../contants/routes";
import { useEffect } from "react";
import useAuthAPI from "../hooks/use-auth";

export default function PrivateRoute() {
    const { token, setToken } = useAuth();
    const { refresh } = useAuthAPI()

    useEffect(() => {
        if (!token) {
            refresh().then((data: { token: string }) => {
                setToken(data.token);
            }).catch(() => {
                setToken("");
            });
        }
    }, [token])

    return token ? <Outlet /> : <Navigate to={Routes.LOGIN} />
}