interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
}

export default function InputText({ label, type, ...props }: InputTextProps) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                {...props} />
        </div>
    )
}