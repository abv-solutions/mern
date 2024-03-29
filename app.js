const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const config = require('./config/config');
const connectDB = require('./config/db');

const app = express();

// Body Parser Middleware
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectDB();

// Set the routes
app.use('/items', require('./routes/items'));
app.use('/users', require('./routes/users'));

// Serve static assets if in production
if (config.ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Start the server
app.listen(config.PORT, console.log(`Server: Started on port ${config.PORT}`));
