import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/ProductTypes";
const prisma = new PrismaClient();

async function createProduct(product: ProductProps) {
    const { name, url, userId, interval, unit } = product;
    await prisma.product.create({ data: { name, url, userId, interval, unit } });
}

async function getProducts(userId: string) {
    return await prisma.product.findMany({ where: { userId } });
}

async function deleteProduct(id: string) {
    await prisma.product.delete({ where: { id } });
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct
}