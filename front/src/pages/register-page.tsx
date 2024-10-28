import Container from "../components/Container";
import FormContainer from "../components/FormContainer";
import InputText from "../components/InputText";
import Main from "../components/Main";

export default function Register() {

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <Container>
            <Main>
                <FormContainer onSubmit={onSubmit}>
                    <InputText
                        label="E-mail"
                        type="email"
                    />
                    <InputText
                        label="Senha"
                        type="password"
                    />
                    <InputText
                        label="Confirme a senha"
                        type="password"
                    />
                    <button type="submit">Cadastrar</button>
                    <div>
                        Já tem uma conta? <a href="/">Entrar</a>
                    </div>
                </FormContainer>

            </Main>
        </Container>
    )
}