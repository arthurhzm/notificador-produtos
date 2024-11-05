import { PrismaClient } from "@prisma/client";
import { MercadoLivreRules } from "../rules/MercadoLivreRules";
import { Rules } from "../rules/Rules";
import { KabumRules } from "../rules/KabumRules";
import { PichauRules } from "../rules/PichauRules";
import { AmazonRules } from "../rules/AmazonRules";
import { AliExpressRules } from "../rules/AliExpressRules";
import { CasasBahiaRules } from "../rules/CasasBahiaRules";
import { TerabyteShopRules } from "../rules/TerabyteShopRules";
const MailService = require("./MailService");
const puppeteer = require('puppeteer');
const prisma = new PrismaClient();

const getRulesClass = (url: string) => {

    if (url.includes("mercadolivre")) {
        return new MercadoLivreRules();
    }
    if (url.includes("kabum")) {
        return new KabumRules();
    }
    if (url.includes("pichau")) {
        return new PichauRules();
    }
    if (url.includes("amazon")) {
        return new AmazonRules();
    }
    if (url.includes("aliexpress")) {
        return new AliExpressRules();
    }
    if (url.includes("casasbahia")) {
        return new CasasBahiaRules();
    }
    if (url.includes("terabyte")) {
        return new TerabyteShopRules();
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
        throw new Error("Loja não suportada: " + url.origin);
    }

    const price = await fetchPrice(link, rulesClass);

    if (!price) {
        throw new Error("Preço não encontrado" + url.origin);
    }

    const product = await prisma.product.findUnique({ where: { url: link } });

    if (!product) {
        throw new Error("Produto não encontrado" + url.origin);
    }

    const lowestPrice = await prisma.productPrice.findFirst({ where: { productId: product.id }, orderBy: { price: 'asc' } });

    await prisma.productPrice.create({ data: { productId: product.id, price } });

    if (!lowestPrice || price < lowestPrice.price) {
        MailService.sendPriceNotification(product.id, price);
    }
}

module.exports = {
    getProductPrice
}