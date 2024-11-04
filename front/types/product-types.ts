export type CreateProductProps = {
    name: string,
    url: string
}

export type ProductUserProps = {
    id: string,
    name: string,
    url: string,
    userId: string,
    Product: ProductProps
}

type ProductProps = {
    createdAt: string,
    id: string,
    updatedAt: string,
    url: string
}