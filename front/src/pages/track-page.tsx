import { useForm } from "react-hook-form";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import Main from "../components/Main";
import InputText from "../components/InputText";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputGroup from "../components/InputGroup";
import Selectpicker from "../components/Selectpicker";
import Option from "../components/Option";
import Button from "../components/Button";

function ProductForm() {

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
        link: z.string().url("Link do produto deve ser uma URL válida"),
        interval: z.number({message: "O valor deve ser um número"}).min(1, { message: "O intervalo deve ser maior que 0" }),
        unit: z.enum(["minutes", "hours", "days"], { message: "Unidade de tempo inválida" })
    });

    type ProductFormType = z.infer<typeof schema>;

    const { register, handleSubmit, formState } = useForm<ProductFormType>({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data: ProductFormType) => {
        console.log(data);
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
                {...register("link")}
                errors={formState.errors.link}
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
                    <Option
                        value={""}
                        text="SELECIONE 1"
                    />
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