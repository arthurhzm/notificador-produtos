import { CreateUserProps } from './../../types/user-types';
import useApi from './use-api';
const useAuthAPI = () => {

    const { api } = useApi();

    const createUser = async (payload: CreateUserProps) => {
        const { data } = await api.post("/users", payload);
        return data;
    }

    return {
        createUser
    }

}

export default useAuthAPI;