type ButtonProps = {
    type: "button" | "submit" | "reset";
    children: React.ReactNode;
}

export default function Button({ type, children, ...props }: ButtonProps) {
    return (
        <button
            type={type}
            {...props}>
            {children}
        </button>
    );
}