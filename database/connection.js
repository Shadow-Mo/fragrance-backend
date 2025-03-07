require('dotenv').config();
const mongoose = require('mongoose');

// Get the base MongoDB URI from environment variables
const baseMongoUri =
	process.env.NODE_ENV === 'production' ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_QA;
	
// Add explicit TLS parameters if they don't already exist in the URI
let MONGO_URI = baseMongoUri;
if (baseMongoUri && !baseMongoUri.includes('tls=')) {
    // Add TLS parameters
    const separator = baseMongoUri.includes('?') ? '&' : '?';
    MONGO_URI = `${baseMongoUri}${separator}tls=true&tlsInsecure=false`;
}

console.log('mongo_uri', MONGO_URI);

const connectToMongoDB = () => {
	try {
		mongoose.connect(MONGO_URI, {
			serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
			socketTimeoutMS: 45000,         // Close sockets after 45 seconds of inactivity
			family: 4                       // Use IPv4, skip trying IPv6
		});
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
