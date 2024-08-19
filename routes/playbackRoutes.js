// routes/playbackRoutes.js

const express = require('express');
const playbackRouter = express.Router();
const { playSong } = require('../controllers/playbackController');

playbackRouter.post('/:songId', playSong);

module.exports = playbackRouter;
