import axios, { HttpStatusCode, isAxiosError } from "axios";

const useApi = () => {
    const api = axios.create({
        baseURL: import.meta.env.BASE_URL,
        timeout: 5000,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    api.interceptors.response.use(
        response => {
            return response.data;
        },
        error => {
            if (isAxiosError(error)) {
                const status = error.response?.status;

                if (status === HttpStatusCode.BadRequest) {
                    const message = error.response?.data.message || "Bad Request";

                }
            }

            return Promise.reject(error);
        }
    );

}

export default useApi;