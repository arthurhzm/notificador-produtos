import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/ProductTypes";
const MonitorService = require("./MonitorService")
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
    await prisma.product.delete({ where: { id } });
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct
}