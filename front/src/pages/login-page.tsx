import { z } from "zod";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Routes from "../contants/routes";

function LoginForm() {

    const schema = z.object({
        email: z.string().email({ message: "E-mail inválido" }),
        password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    });

    type LoginFormType = z.infer<typeof schema>;

    const { register, handleSubmit, formState } = useForm<LoginFormType>({
        resolver: zodResolver(schema)
    })

    const onSubmit = (data: LoginFormType) => {
        console.log(data);
    }

    return (
        <>
            <h1>Bem-vindo de volta!</h1>
            <FormContainer onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Email"
                    type="email"
                    {...register("email")}
                    errors={formState.errors.email}
                />
                <InputText
                    label="Senha"
                    type="password"
                    {...register("password")}
                    errors={formState.errors.password}
                />
                <Button
                    type="submit">
                    Entrar
                </Button>
            </FormContainer>
            <div>
                Não tem uma conta? <a href={Routes.REGISTER}>Cadastre-se</a>
            </div>
        </>
    )

}

export default function Login() {
    return (
        <Container>
            <Main>
                <LoginForm />
            </Main>
        </Container>
    )
}