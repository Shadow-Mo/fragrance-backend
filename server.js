require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes.js');


const app = express();
const allowedOrigins = [
    // Include localhost for development if needed
    'http://localhost:3000',
    'http://localhost:3001',
];

// Improved CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 3600 // Cache preflight request for 1 hour
};

// Apply CORS middleware before other middleware


// Remove the redundant headers middleware since CORS middleware handles it
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://aihyr.com');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// Error handling middleware for CORS errors
app.use((err, req, res, next) => {
    if (err.message === 'Not allowed by CORS') {
        console.error('CORS Error:', req.headers.origin);
        return res.status(403).json({
            error: 'CORS Error: Origin not allowed',
            origin: req.headers.origin
        });
    }
    next(err);
});

app.use(cors(corsOptions));
const port = process.env.PORT || 3001;
const connectToMongoDB = require('./database/connection');


connectToMongoDB();
app.use(express.static('../app/build'));

app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);
app.use(bodyParser.json());
//app.use(fileUpload());

app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

app.use('/labs', companyRoutes);


app.listen(port, function () {
	console.log('Server is running on Port: ' + port);
});
