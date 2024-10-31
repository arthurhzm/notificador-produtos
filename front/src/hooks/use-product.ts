import { CreateProductProps } from './../../types/product-types';
import useApi from './use-api';

const useProduct = () => {
    const { api } = useApi();

    const createProduct = async (payload: CreateProductProps) => {
        const { data } = await api.post("/products", payload);
        return data;
    }

    const getProducts = async () => {
        const { data } = await api.get("/products");
        return data;
    }

    return {
        createProduct,
        getProducts
    }
}

export default useProduct;