import { ProductProps } from './../../types/product-types';
import useApi from './use-api';

const useProduct = () => {
    const { api } = useApi();

    const createProduct = async (payload: ProductProps) => {
        const { data } = await api.post("/products", payload);
        return data;
    }

    return {
        createProduct
    }
}

export default useProduct;