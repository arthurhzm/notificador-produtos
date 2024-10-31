import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../components/Button";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputGroup from "../components/InputGroup";
import InputText from "../components/InputText";
import Main from "../components/Main";
import Option from "../components/Option";
import Selectpicker from "../components/Selectpicker";
import useProduct from "../hooks/use-product";
import { useToast } from "../contexts/ToastContext";

function ProductForm() {

    const { createProduct } = useProduct();
    const { showSuccess } = useToast()

    const UNITS = [
        {
            value: "minutes",
            text: "minutos"
        },
        {
            value: "hours",
            text: "horas"
        },
        {
            value: "days",
            text: "dias"
        }
    ];

    const schema = z.object({
        name: z.string().min(3, { message: "O nome do produto deve ter pelo menos 3 caracteres" }),
        url: z.string().url("Link do produto deve ser uma URL válida"),
        interval: z.number({ message: "O valor deve ser um número" }).min(1, { message: "O intervalo deve ser maior que 0" }),
        unit: z.enum(["minutes", "hours", "days"], { message: "Unidade de tempo inválida" })
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
            <InputText
                label="Nome do produto"
                type="text"
                {...register("name")}
                errors={formState.errors.name}
            />
            <InputText
                label="Link do produto"
                type="url"
                {...register("url")}
                errors={formState.errors.url}
            />
            <InputGroup>
                <InputText
                    label="Verificar a cada"
                    type="number"
                    {...register("interval", { valueAsNumber: true })}
                    errors={formState.errors.interval}
                    min={1}
                    max={59}
                    onChange={(e) => {
                        const value = parseInt(e.currentTarget.value, 10);
                        e.currentTarget.value = value < 1 ? "1" : value > 59 ? "59" : value.toString();
                    }}
                />
                <Selectpicker
                    {...register("unit")}
                    errors={formState.errors.unit}>
                    {UNITS.map((unit, index) => (
                        <Option
                            key={index}
                            value={unit.value}
                            text={unit.text}
                        />
                    ))}
                </Selectpicker>
            </InputGroup>
            <Button type="submit">
                Salvar
            </Button>
            <Button
                type="button"
                onClick={() => reset()}>
                Limpar
            </Button>
        </FormContainer>
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