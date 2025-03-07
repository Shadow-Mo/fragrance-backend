require('dotenv').config();
const mongoose = require('mongoose');
const MONGO_URI =
	process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_QA;
console.log('mongo_uri', MONGO_URI);

const connectToMongoDB = () => {
	try {
		mongoose.connect(MONGO_URI);
		console.log('Connected to Mongoose.');
	} catch (err) {
		console.log('Could not connect: ' + err);
	}
	const dbConnection = mongoose.connection;

	dbConnection.on('error', (err) => {
		console.log(`Connection Error: ${err}`);
	});

	dbConnection.once('open', () => {
		console.log('Connected to DB!');
	});
};
module.exports = connectToMongoDB;
