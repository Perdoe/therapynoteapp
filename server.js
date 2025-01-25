// server.js
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Security middleware
app.use(helmet());
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));