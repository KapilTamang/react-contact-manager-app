const express = require('express');

const app = express();

const path = require('path');

//Initialize Middleware
app.use(
	express.json({
		extended: false,
	})
);

//Database Connection
const connectDB = require('./config/db');

//Connect Database
connectDB();

// Define Route
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

//Serve static assests in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) =>
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
	);
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
