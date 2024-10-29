import { z } from "zod";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";
import { useForm } from "react-hook-form";


function RegisterForm() {

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
    }).refine(data => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

    type RegisterFormType = z.infer<typeof schema>;

    const { register, handleSubmit, formState } = useForm<RegisterFormType>()


    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <FormContainer onSubmit={onSubmit}>
            <InputText
                label="E-mail"
                type="email"
                {...register("email")}
            />
            <InputText
                label="Senha"
                type="password"
                {...register("password")}
            />
            <InputText
                label="Confirme a senha"
                type="password"
                {...register("confirmPassword")}
            />
            <button type="submit">Cadastrar</button>
            <div>
                Já tem uma conta? <a href="/">Entrar</a>
            </div>
        </FormContainer>
    )
}

export default function Register() {
    return (
        <Container>
            <Main>
                <RegisterForm />
            </Main>
        </Container>
    )
}
