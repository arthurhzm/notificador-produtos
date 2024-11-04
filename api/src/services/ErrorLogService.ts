import { PrismaClient } from "@prisma/client";
import { ErrorProductType } from "../types/ErrorProductTypes";
const prisma = new PrismaClient();

async function productErrorLog(data: ErrorProductType) {
    const { productId, error } = data;
    await prisma.productErrorLog.create({ data: { error, productId } });
}

module.exports = {
    productErrorLog
}