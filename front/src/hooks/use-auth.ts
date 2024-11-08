import { UserProps } from './../../types/user-types';
import useApi from './use-api';
const useAuthAPI = () => {

    const { api } = useApi();

    const createUser = async (payload: UserProps) => {
        const { data } = await api.post("/users", payload);
        return data;
    }

    const getUser = async (id: string) => {
        const { data } = await api.get(`/users/${id}`);
        return data;
    }

    const auth = async (payload: { email: string, password: string }) => {
        const { data } = await api.post("/auth", payload);
        return data;
    }

    const refresh = async () => {
        const { data } = await api.post("/auth/refresh");
        return data;
    }

    return {
        createUser,
        getUser,
        auth,
        refresh
    }

}

export default useAuthAPI;