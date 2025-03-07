const Order = require('../models/order');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const submitOrder = async (req, res) => {
    const { customerName, email, itemDescription } = req.body;
    console.log(req.body)
    try {
        const order = new Order({
            customerName,
            email,
            itemDescription
        });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrders,
    submitOrder
};