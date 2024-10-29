import { z } from "zod";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


function RegisterForm() {
    const schema = z.object({
        email: z.string().email({ message: "E-mail inválido" }),
        password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
        confirmPassword: z.string().min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres" }),
    }).refine(data => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

    type RegisterFormType = z.infer<typeof schema>;

    const { register, handleSubmit, formState } = useForm<RegisterFormType>({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: RegisterFormType) => {
        console.log(data);
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputText
                label="E-mail"
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
            <InputText
                label="Confirme a senha"
                type="password"
                {...register("confirmPassword")}
                errors={formState.errors.confirmPassword}
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
