type FormContainerProps = {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
};

export default function FormContainer({ onSubmit, children }: FormContainerProps) {
    return (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    )
}