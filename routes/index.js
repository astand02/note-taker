const express = require('express');

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');

const app = express();
// http://localhost:3001/api/tips
app.use('/notes', notesRouter);
// http://localhost:3001/api/feedback

module.exports = app;
