import { PrismaClient } from "@prisma/client";

const nodemailer = require('nodemailer');
const prisma = new PrismaClient();

function getEmailSettings() {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    return transporter;
}

function sendEmail(to: string, subject: string, text: string) {
    const transporter = getEmailSettings();

    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: text
    });
}

async function sendPriceNotification(productId: string, price: number) {

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return;

    const productUsers = await prisma.productUser.findMany({ where: { productId } });
    if (!productUsers.length) return;

    productUsers.forEach(async p => {
        const user = await prisma.user.findUnique({ where: { id: p.userId } });
        if (!user) return;

        const generateEmailText = () => {
            return `
                <p>Olá ${user.name},</p>
                <p>O preço do produto ${p.name} baixou para R$ ${price}</p>
                <p>Confira o produto <a href="${product.url}">aqui</a></p>
            `
        }

        sendEmail(user.email, "Preço do produto baixou", generateEmailText());
    });
}

module.exports = {
    sendPriceNotification
}