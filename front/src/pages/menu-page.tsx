import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductUserProps } from "../../types/product-types";
import Container from "../components/Container";
import Main from "../components/Main";
import PageTitle from "../components/PageTitle";
import Routes from "../contants/routes";
import { useToast } from "../contexts/ToastContext";
import useProduct from "../hooks/use-product";


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
    const [products, setProducts] = useState<ProductUserProps[] | []>([]);
    const { getProducts, deleteProduct } = useProduct();
    const { showSuccess } = useToast()

    useEffect(() => {
        if (products.length) return;

        const fetchProducts = async () => {
            const { products } = await getProducts();
            setProducts(products);
        }

        fetchProducts();

    }, []);

    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        showSuccess("Produto excluído com sucesso");
        setProducts(products.filter(p => p.id != id));
    }

    return (
        <div>
            {products.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Link</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: ProductUserProps, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td><a href={product.Product.url} target="_blank">Acessar</a></td>
                                <td>
                                    <button onClick={() => handleDelete(product.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <>Nenhum produto sendo rastreado no momento</>}
        </div>
    )
}

export default function Menu() {
    return (
        <Container>
            <Main>
                <PageTitle title="Menu principal" />
                <MenuOption text={"Monitorar produto"} route={Routes.TRACK} />
                <ProductsGrid />
            </Main>
        </Container>
    )
}