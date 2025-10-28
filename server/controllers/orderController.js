import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// ✅ Place COD order
export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.user.id;
        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.json({ success: false, message: "No items found in order" });
        }

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({
                    success: false,
                    message: `Product not found: ${item.product}`,
                });
            }
            amount += product.price * item.quantity;
        }

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            paymentType: "COD",
        });

        return res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ userId })
            .populate("items.product", "name price image")
            .sort({ createdAt: -1 });

        return res.json({ success: true, orders });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: error.message });
    }
};
