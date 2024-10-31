import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Main from "../components/Main";
import Routes from "../contants/routes";

type MenuOptionProps = {
    text: string;
    route: string;
}

function MenuOption({ text, route }: MenuOptionProps) {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(route)}>
                {text}
            </button>
        </div>
    )
}

export default function Menu() {
    return (
        <Container>
            <Main>
                <h1>Menu principal</h1>
                <MenuOption
                    text={"Monitorar produto"}
                    route={Routes.TRACK} />
            </Main>
        </Container>
    )
}