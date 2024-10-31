import { Router } from "express";
import { createProduct, deleteProduct, getProducts } from "../controllers/ProductController";

const ProductRouter = Router();

ProductRouter.post("/", createProduct);
ProductRouter.get("/", getProducts);
ProductRouter.delete("/:id", deleteProduct)

export default ProductRouter;