type OptionProps = {
    value: number | string;
    text: string
}

export default function Option({ value, text }: OptionProps) {
    return (
        <option
            key={value}
            value={value}>
            {text}
        </option>
    )
}