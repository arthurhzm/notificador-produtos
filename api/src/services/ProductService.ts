import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/ProductTypes";
const prisma = new PrismaClient();

async function createProduct(product: ProductProps) {
    const { name, url, userId, interval, unit } = product;
    await prisma.product.create({ data: { url } });

    const { id } = await prisma.product.upsert({
        where: { url },
        update: {},
        create: { url },
        select: { id: true }
    });

    await prisma.productUser.create({ data: { name, interval, unit, userId, productId: id } });
}

async function getProducts(userId: string) {
    return await prisma.productUser.findMany({ where: { userId }, include: { Product: true } });
}

async function deleteProduct(id: string) {
    const productUser = await prisma.productUser.findUnique({ where: { id } });
    if (!productUser) throw new Error("ProductUser not found");

    await prisma.productUser.delete({ where: { id } });

    const productUsersCount = await prisma.productUser.count({ where: { productId: productUser.productId } });
    if (productUsersCount === 0) {
        await prisma.product.delete({ where: { id: productUser.productId } });
    }
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct
}