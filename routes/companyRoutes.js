const express = require('express');
const {
	getOrders,
	submitOrder
} = require('../controllers/orderControllers');

const router = express.Router();
const fileUpload = require('express-fileupload');
router.get('/', (req, res) => {
	res.status(200).json({ message: 'company route is working' });
});

router.post('/get-orders', getOrders);

router.post('/submit-order', submitOrder);

module.exports = router;
