import { Container } from "react-bootstrap";

type MainProps = {
    children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
    return (
        <Container fluid>
            {children}
        </Container>
    )
}