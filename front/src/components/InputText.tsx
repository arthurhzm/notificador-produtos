import React from 'react';
import { FieldError } from "react-hook-form";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: string;
    errors?: FieldError;
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
    ({ label, type, errors, ...props }, ref) => {
        return (
            <div>
                <label>{label}</label>
                <input
                    ref={ref}
                    type={type}
                    {...props}
                />
                {errors && <span>{errors.message}</span>}
            </div>
        );
    }
);

export default InputText;
