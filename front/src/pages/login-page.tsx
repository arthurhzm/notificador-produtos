import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";

export default function Login() {

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <Container>
            <Main>
                <h1>Bem-vindo de volta!</h1>
                <FormContainer onSubmit={onSubmit}>
                    <InputText
                        label="Email"
                        type="email"
                    />
                    <InputText
                        label="Senha"
                        type="password"
                    />
                    <button type="submit">Entrar</button>
                </FormContainer>
                <div>
                    Não tem uma conta? <a href="/register">Cadastre-se</a>
                </div>
            </Main>
        </Container>
    )
}