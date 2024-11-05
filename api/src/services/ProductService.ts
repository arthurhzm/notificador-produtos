import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/ProductTypes";
const prisma = new PrismaClient();

async function createProduct(product: ProductProps) {
    const { name, url, userId } = product;

    const { id } = await prisma.product.upsert({
        where: { url },
        update: {},
        create: { url },
        select: { id: true }
    });

    try {
        await prisma.productUser.create({ data: { name, userId, productId: id } });
    } catch (error: any) {
        if (error.code === "P2002") {
            throw new Error("Você já está monitorando este produto");
        }
    }
}

async function getProducts(userId: string) {
    return await prisma.productUser.findMany({ where: { userId }, include: { Product: true } });
}

async function deleteProduct(id: string) {
    const productUser = await prisma.productUser.findUnique({ where: { id } });
    if (!productUser) throw new Error("ProductUser not found");

    const productUsersCount = await prisma.productUser.count({ where: { productId: productUser.productId } });
    await prisma.productUser.delete({ where: { id } });

    if (productUsersCount === 1) {
        await prisma.productErrorLog.deleteMany({ where: { productId: productUser.productId } });
        await prisma.productPrice.deleteMany({ where: { productId: productUser.productId } });
        await prisma.product.delete({ where: { id: productUser.productId } });
    }
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct
}