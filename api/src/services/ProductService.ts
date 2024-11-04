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
    MonitorService.getProductPrice("https://www.mercadolivre.com.br/10-chave-hh-mini-3-terminais-2-posicoes-90-45x86mm/p/MLB39017741#wid%3DMLB4976246872%26sid%3Dsearch%26searchVariation%3DMLB39017741%26position%3D3%26search_layout%3Dgrid%26type%3Dproduct%26tracking_id%3D0081d049-7e75-4e52-974e-ceca631ee1d2")
    
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