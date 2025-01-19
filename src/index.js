// Import necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

// Configure dotenv
dotenv.config({
  path: './env'
});

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
  });

// Make sure the 'app' is properly defined in 'app.js'
// Example content for app.js:
// import express from 'express';
// const app = express();
// export { app };
