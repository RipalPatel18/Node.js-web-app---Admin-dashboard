require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

// Default redirect
app.get('/', (req, res) => res.redirect('/admin'));

// Error
app.use((req, res) => res.status(404).send('404 - Page Not Found'));

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
