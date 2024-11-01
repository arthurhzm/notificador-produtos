const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require("fs");


const getRulesClass = (url: string) => {
    if (url.includes("mercadolivre")) {
        return {
            name: ".ui-pdp-title",
            price: ".price-tag-fraction",
            discount: ".price-tag-fraction"
        }
    }
}

async function getProductPrice(link: string) {
    const url = new URL(link);

}

module.exports = {
    getProductPrice
}