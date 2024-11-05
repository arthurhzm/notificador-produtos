import { PrismaClient } from "@prisma/client";
const MonitorService = require("../services/MonitorService");
const ErrorLogService = require("../services/ErrorLogService");
const cron = require("node-cron");

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

async function monitorProducts() {

    // Traz todos os produtos vinculados à usuários
    const products = await fetchProducts();

    if (products.length === 0) {
        console.log("Nenhum produto para monitorar");
        return;
    }

    // Loopa os produtos procurando pelo preço de cada um
    await Promise.all(products.map(async product => {
        try {
            await MonitorService.getProductPrice(product.url);
        } catch (error: any) {
            await ErrorLogService.productErrorLog({ productId: product.id, error: error.message });
        }
    }));
}

// */10 * * * *

cron.schedule("* * * * *", async () => {
    console.log("Iniciando monitoramento de produtos" + new Date());
    await monitorProducts();
    console.log("Monitoramento de produtos finalizado" + new Date());
});