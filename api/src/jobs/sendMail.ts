import { PrismaClient } from "@prisma/client";
const MonitorService = require("../services/MonitorService");
const ErrorLogService = require("../services/ErrorLogService");

const prisma = new PrismaClient();

async function fetchProducts() {
    const productsWithUsers = await prisma.product.findMany({
        include: {
            ProductUser: {
                include: {
                    User: true
                }
            }
        }
    });

    return productsWithUsers;
}

async function main() {

    // Traz todos os produtos vinculados à usuários
    const products = await fetchProducts();

    // Loopa os produtos procurando pelo preço de cada um
    await Promise.all(products.map(async product => {
        try {
            await MonitorService.getProductPrice(product.url);
        } catch (error: any) {
            await ErrorLogService.productErrorLog({ productId: product.id, error: error.message });
        }
    }));
}

main().catch(console.error);