import { PrismaClient } from "@prisma/client";
import { MercadoLivreRules } from "../rules/MercadoLivreRules";
import { Rules } from "../rules/Rules";
const puppeteer = require('puppeteer');
const prisma = new PrismaClient();

const getRulesClass = (url: string) => {
    if (url.includes("mercadolivre")) {
        return new MercadoLivreRules();
    }
}

const fetchPrice = async (url: string, rulesClass: Rules) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });
        const selector = rulesClass.getSelector();
        const priceElement = await page.$(selector);

        if (!priceElement) return null;

        const priceText = await page.evaluate((el: any) => el.textContent, priceElement);
        const price = parseFloat(priceText.replace(/[^\d,.-]/g, '').replace(',', '.'));
        return price
    } finally {
        await browser.close();
    }
}

async function getProductPrice(link: string) {
    const url = new URL(link);

    const rulesClass = getRulesClass(url.origin);
    if (!rulesClass) {
        throw new Error("Loja não suportada");
    }

    const price = await fetchPrice(link, rulesClass);

    if (!price) {
        throw new Error("Preço não encontrado");
    }

    const product = await prisma.product.findUnique({ where: { url: link } });

    if (!product) {
        throw new Error("Produto não encontrado");
    }

    await prisma.productPrice.create({ data: { productId: product.id, price } });
}

module.exports = {
    getProductPrice
}