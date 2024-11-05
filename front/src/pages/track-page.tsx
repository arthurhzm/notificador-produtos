import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";
import { useToast } from "../contexts/ToastContext";
import useProduct from "../hooks/use-product";
import { Button, Col, Row } from "react-bootstrap";

function ProductForm() {

    const { createProduct } = useProduct();
    const { showSuccess } = useToast()

    const schema = z.object({
        name: z.string().min(3, { message: "O nome do produto deve ter pelo menos 3 caracteres" }),
        url: z.string().url("Link do produto deve ser uma URL válida")
    });

    type ProductFormType = z.infer<typeof schema>;

    const { register, handleSubmit, formState, reset } = useForm<ProductFormType>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: ProductFormType) => {
        await createProduct(data);
        showSuccess("Produto salvo com sucesso, a partir de agora vamos monitorar o preço para você!");
        reset();
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Row>
                <Col md={"auto"}>
                    <InputText
                        label="Nome do produto"
                        type="text"
                        {...register("name")}
                        errors={formState.errors.name}
                    />
                </Col>
                <Col md>
                    <InputText
                        label="Link do produto"
                        type="url"
                        {...register("url")}
                        errors={formState.errors.url}
                    />
                </Col>
            </Row>
            <Row className="justify-content-end mt-2">
                <Col md={"auto"}>
                    <Button
                        variant="outline-danger"
                        type="button"
                        onClick={() => reset()}>
                        Limpar
                    </Button>
                </Col>
                <Col md={"auto"}>
                    <Button
                        variant="outline-success"
                        type="submit">
                        Salvar
                    </Button>
                </Col>
            </Row>

        </FormContainer >
    )
}

export default function Track() {
    return (
        <Container>
            <Main>
                <h1>Monitorar produto</h1>
                <ProductForm />
            </Main>
        </Container>
    )
}