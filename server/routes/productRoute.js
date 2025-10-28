import express from "express";
import { productList, productById } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/list", productList);
productRouter.get("/:id", productById);

export default productRouter;
