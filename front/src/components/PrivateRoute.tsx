import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import useAuthAPI from "../hooks/use-auth";
import Routes from "../contants/routes";

export default function PrivateRoute() {
    const { token, setToken } = useAuth();
    const { refresh } = useAuthAPI();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            const checkToken = async () => {
                try {
                    const data = await refresh();
                    setToken(data.token);
                } catch {
                    setToken("");
                } finally {
                    setLoading(false);
                }
            };

            checkToken();
        } else {
            setLoading(false);
        }
    }, [token]);

    if (loading) {
        return <div>Carregando...</div>; // Exibe um indicador de carregamento enquanto verifica o token
    }

    return token ? <Outlet /> : <Navigate to={Routes.LOGIN} />;
}
