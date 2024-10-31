import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Main from "../components/Main";
import Routes from "../contants/routes";
import { useEffect, useState } from "react";
import useProduct from "../hooks/use-product";
import { ProductProps } from "../../types/product-types";

type MenuOptionProps = {
    text: string;
    route: string;
}

function MenuOption({ text, route }: MenuOptionProps) {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(route)}>
                {text}
            </button>
        </div>
    )
}

function ProductsGrid() {
    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const { getProducts } = useProduct()

    useEffect(() => {
        if (products.length) return;

        const fetchProducts = async () => {
            const { products } = await getProducts();
            setProducts(products);
        }

        fetchProducts();

    }, [getProducts, products.length])

    return (
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Link</th>
                    <th>Intervalo</th>
                    <th>Unidade</th>
                </tr>
            </thead>
            <tbody>
                {products.length ? products.map((product: ProductProps, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.url}</td>
                        <td>{product.interval}</td>
                        <td>{product.unit}</td>
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}

export default function Menu() {
    return (
        <Container>
            <Main>
                <h1>Menu principal</h1>
                <MenuOption
                    text={"Monitorar produto"}
                    route={Routes.TRACK} />
                <ProductsGrid />
            </Main>
        </Container>
    )
}