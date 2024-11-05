type PageTitleProps = {
    title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}