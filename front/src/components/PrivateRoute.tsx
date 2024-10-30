import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Routes from "../contants/routes";

export default function PrivateRoute() {
    const { token } = useAuth();
    return token ? <Outlet /> : <Navigate to={Routes.LOGIN} />
}