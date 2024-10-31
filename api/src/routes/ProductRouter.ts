import { Router } from "express";
import { createProduct } from "../controllers/ProductController";

const ProductRouter = Router();

ProductRouter.post("/", createProduct);

export default ProductRouter;