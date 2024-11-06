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
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
        const selector = rulesClass.getSelector();

        try {
            // Aguarda o seletor, tentando capturar o preço diretamente
            await page.waitForSelector(selector, { timeout: 3000 });
            const priceElement = await page.$(selector);

            // Verifica se o elemento foi encontrado antes de prosseguir
            if (priceElement) {
                const priceText = await page.evaluate((el: any) => el.textContent, priceElement);
                const price = parseFloat(priceText.replace(/[^\d,.-]/g, '').replace(',', '.'));
                return price;
            } else {
                console.warn(`Elemento não encontrado para o seletor: ${selector}`);
            }
        } catch (error) {
            // Caso o seletor falhe, tenta pelo Regex no HTML completo
            const html = await page.content();
            console.log('Fallback: buscando preço por Regex');

            const price = rulesClass.getPriceUsingRegex(html);

            // Log de fallback para depuração
            if (price) {
                console.log(`Preço encontrado pelo Regex: ${price}`);
                return price;
            } else {
                console.warn('Preço não encontrado pelo Regex.');
                console.warn(html); // Registra o HTML completo para análise
            }
        }

    } finally {
        await browser.close();
    }
    return null; // Retorna null se nenhum preço foi encontrado
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