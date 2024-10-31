import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/ProductTypes";
const prisma = new PrismaClient();

async function createProduct(product: ProductProps) {
    const { name, link, userId, interval, unit } = product;
    await prisma.product.create({ data: { name, url: link, userId, interval, unit } });
}

async function getProducts(userId: string) {
    return await prisma.product.findMany({ where: { userId } });
}

module.exports = {
    createProduct,
    getProducts
}