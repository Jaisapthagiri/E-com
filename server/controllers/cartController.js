import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.user.id;

        if (!cartItems || typeof cartItems !== "object") {
            return res.json({ success: false, message: "Invalid cart data" });
        }

        await User.findByIdAndUpdate(userId, { cartItems });

        res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
};
