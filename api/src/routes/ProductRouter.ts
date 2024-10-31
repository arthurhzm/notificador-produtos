import { Router } from "express";
import { createProduct, getProducts } from "../controllers/ProductController";

const ProductRouter = Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("/", getProducts);

export default ProductRouter;