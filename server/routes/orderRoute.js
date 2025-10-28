import express from "express";
import authUser from "../middleware/authUser.js";
import { placeOrderCOD, getUserOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place-cod", authUser, placeOrderCOD);
orderRouter.get("/user", authUser, getUserOrders);

export default orderRouter;
