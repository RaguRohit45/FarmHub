const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
const parser = require('body-parser');
const router = require('./routes/router');
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    try {
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(parser.json());
const allowedOrigins = [
  "http://localhost:5173",   // React dev server
  "https://farmhub-uldd.onrender.com" // Production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS")); // block
      }
    },
    credentials: true, // if you are using cookies or auth headers
  })
);


app.use('/api', router);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
