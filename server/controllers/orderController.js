import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Stripe from "stripe";

// A helper function to calculate the total amount efficiently
const calculateAmount = async (items) => {
    // 1. Create an array of promises to find all products
    const productPromises = items.map(item => Product.findById(item.product));

    // 2. Wait for all promises to resolve in parallel
    const products = await Promise.all(productPromises);

    // 3. Create a map for quick lookups to prevent errors with missing products
    const productMap = new Map(products.filter(p => p).map(p => [p._id.toString(), p]));

    // 4. Calculate the total amount with a standard reduce
    let amount = items.reduce((acc, item) => {
        const product = productMap.get(item.product);
        // Only add to amount if the product was found
        if (product) {
            return acc + product.offerPrice * item.quantity;
        }
        return acc;
    }, 0);

    // Add 2% tax
    amount += Math.floor(amount * 0.02);

    return amount;
};


// ----------------- COD ORDER -----------------
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // ✅ Use the optimized function to calculate amount
        const amount = await calculateAmount(items);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        // Clear user cart after placing order
        await User.findByIdAndUpdate(userId, { cartItems: {} });

        return res.json({ success: true, message: "Order Placed Successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// ----------------- STRIPE ORDER -----------------
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        // ✅ Use the optimized function to calculate amount
        const amount = await calculateAmount(items);

        // Create order in DB (unpaid)
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
            isPaid: false,
        });

        // Stripe
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = await Promise.all(items.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
                price_data: {
                    currency: "inr",
                    product_data: { name: product.name },
                    unit_amount: product.offerPrice * 100,
                },
                quantity: item.quantity,
            };
        }));

        // Include tax as a line item for clarity on the checkout page
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Taxes & Charges" },
                unit_amount: Math.floor(amount * 0.02 * 100),
            },
            quantity: 1,
        });

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            // ✅ Attach metadata directly to the session for efficiency
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        return res.json({ success: true, url: session.url });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// ----------------- STRIPE WEBHOOK -----------------
export const stripeWebhook = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];

    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object;
            // ✅ Read metadata directly from the session object
            const { orderId, userId } = session.metadata;

            if (orderId && userId) {
                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                await User.findByIdAndUpdate(userId, { cartItems: {} });
            }
            break;
        }

        case "payment_intent.payment_failed": {
            const session = event.data.object;
            const { orderId } = session.metadata;

            if (orderId) {
                await Order.findByIdAndDelete(orderId);
            }
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};


// ----------------- USER ORDERS -----------------
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// ----------------- ALL ORDERS (SELLER/ADMIN) -----------------
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// This seems to be from a different controller (e.g., cartController.js) but is included here as in the prompt
// update user cart Data : /api/cart/update
export const updateCart = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        await User.findByIdAndUpdate(userId, { cartItems });

        res.json({ success: true, message: 'Cart updated' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}