import { z } from "zod";
import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/Button";
import useAuthAPI from "../hooks/use-auth";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import Routes from "../contants/routes";


function RegisterForm() {
    const { createUser } = useAuthAPI();
    const { showSuccess } = useToast();
    const navigate = useNavigate();

    const schema = z.object({
        name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
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
        await createUser(data);
        showSuccess("Usuário criado com sucesso");
        navigate(Routes.LOGIN)
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <InputText
                label="Nome"
                type="text"
                {...register("name")}
                errors={formState.errors.name}
            />

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
            <Button
                type="submit">
                Cadastrar
            </Button>
            <div>
                Já tem uma conta? <a href={Routes.LOGIN}>Entrar</a>
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
