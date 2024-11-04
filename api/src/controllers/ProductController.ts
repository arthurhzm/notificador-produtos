import { Request, Response } from "express";
import HttpStatusCode from "../contants/HttpStatusCode";
const AuthService = require('../services/AuthService');
const ProductService = require('../services/ProductService');

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = req.body;
        const refreshToken = req.cookies.refreshToken;
        const payload = AuthService.verifyRefreshToken(refreshToken);
        const data = { ...product, userId: payload.id };
        await ProductService.createProduct(data);
        res.status(HttpStatusCode.CREATED).json({ message: "Produto criado com sucesso", data: {} });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const payload = AuthService.verifyRefreshToken(refreshToken);
        const products = await ProductService.getProducts(payload.id);
        res.status(HttpStatusCode.OK).json({ message: "Produtos listados com sucesso!", data: { products } });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        
        await ProductService.deleteProduct(id);
        res.status(HttpStatusCode.OK).json({ message: "Produto deletado com sucesso!" });
    } catch (error: any) {
        res.status(HttpStatusCode.BAD_REQUEST).json({ message: error.message });
    }
}