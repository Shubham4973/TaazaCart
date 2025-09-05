import User from "../models/User.js";

// update user cart Data : /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        // 3. Update the cart for the authenticated user
        await User.findByIdAndUpdate(userId, { cartItems });

        res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}