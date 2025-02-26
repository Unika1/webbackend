// //Initialization
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const sequelize = require('./database/db');
// const userRoute = require('./routes/userRoute')
// const productRoute = require('./routes/productRoute')

// //Creating a Server
// const app = express();

// //Creating a port
// const PORT = process.env.PORT || 5000

// //Creating a middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));


// app.get('/login',(req, res)=>{
//     res.send("Welcome to the web page")
// })


// app.use('/users', userRoute);
// app.use('/products', productRoute);


// //Running on PORT
// app.listen(PORT, ()=>{
//     console.log(`Server Running on........................ PORT ${PORT}`)
// })
import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sync } from './sync.js';
import authRoutes from './routes/authRoutes.js';
import remedyRoutes from './routes/remedyRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import reviewRoutes from './routes/ReviewRoutes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static Files (for images, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sync database
sync().then(() => {
  console.log('Database synced');
});
// Setup multer for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);  // Save the file with a unique name
  },
});

const upload = multer({ storage });
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/remedies', remedyRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reviews', reviewRoutes);
// Root Route (Optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
