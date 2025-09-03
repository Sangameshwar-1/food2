const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food2', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', userRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));