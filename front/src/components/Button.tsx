import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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