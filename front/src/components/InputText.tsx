import React from 'react';

interface InputTextProps {
    label: string;
    type: string;
    props?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(({ label, type, props }, ref) => {
    return (
        <div>
            <label>{label}</label>
            <input
                ref={ref}
                type={type}
                {...props}
            />
        </div>
    );
});

export default InputText;