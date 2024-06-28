const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

// Setup CORS
app.use(cors({
  origin: 'https://vishwaracers-baja-frontend.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.json("Hello");
});

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rent', require('./routes/rent'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/team', require('./routes/team'));
app.use('/api/Bookingsroute', require('./routes/Bookingsroute'));
app.use('/api/contact', require('./routes/contact'));

// Start server
app.listen(port, () => {
  console.log(`Vishwaracers listening on port ${port}`);
});
