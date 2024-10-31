import React from 'react';
import { FieldError } from "react-hook-form";

interface SelectpickerProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    errors?: FieldError;
    children: React.ReactNode
}

const Selectpicker = React.forwardRef<HTMLSelectElement, SelectpickerProps>(
    ({ label, errors, children, ...props }, ref) => {
        return (
            <div>
                <label>{label}</label>
                <select
                    ref={ref}
                    {...props}>
                    {children}
                </select>
                {errors && <span>{errors.message}</span>}
            </div>
        );
    }
);

export default Selectpicker;
