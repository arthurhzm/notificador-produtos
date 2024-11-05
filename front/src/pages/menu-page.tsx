import { useEffect, useState } from "react";
import { Button, Col, FormControl, Row, Table } from "react-bootstrap";
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
            <Button
                variant="outline-success"
                onClick={() => navigate(route)}>
                {text}
            </Button>
        </div>
    )
}

function ProductsGrid() {
    const [products, setProducts] = useState<ProductUserProps[] | []>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductUserProps[] | []>([]);
    const { getProducts, deleteProduct } = useProduct();
    const { showSuccess } = useToast()

    useEffect(() => {
        if (products.length) return;

        const fetchProducts = async () => {
            const { products } = await getProducts();
            setProducts(products);
            setFilteredProducts(products);
        }

        fetchProducts();

    }, []);

    const handleDelete = async (id: string) => {
        await deleteProduct(id);
        showSuccess("Produto excluído com sucesso");
        setProducts(products.filter(p => p.id != id));
        setFilteredProducts(products.filter(p => p.id != id));
    }

    return (
        <>
            <Row className="mb-1">
                <Col md={3}>
                    <label>Nome do produto</label>
                    <FormControl
                        onChange={(e) => {
                            const value = e.target.value.toLowerCase();
                            setFilteredProducts(products.filter(product =>
                                product.name.toLowerCase().includes(value)
                            ));
                        }} />
                </Col>
            </Row>
            <div>
                {filteredProducts.length ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome | Loja</th>
                                <th>Link</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product: ProductUserProps, index) => (
                                <tr key={index}>
                                    <td>
                                        {product.name} <br />
                                        <small className="fw-bold">
                                            <a
                                                style={{ textDecoration: "none" }}
                                                className="text-danger"
                                                href={new URL(product.Product.url).origin}>
                                                {new URL(product.Product.url).origin}
                                            </a>
                                        </small>
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-primary"
                                            as="a"
                                            href={product.Product.url} target="_blank">
                                            Acessar
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => handleDelete(product.id)}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </Table>
                ) : <>Nenhum produto encontrado</>}
            </div>
        </>
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