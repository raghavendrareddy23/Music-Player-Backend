const express = require('express');
const router = express.Router();
const songRouter = require('./songRoutes');
const playbackRouter = require('./playbackRoutes');
const playlistRouter = require('./playlistRoutes');
const authRouter = require('./authRoutes');

router.use('/user', authRouter);
router.use('/songs', songRouter);
router.use('/play', playbackRouter);
router.use('/playlists', playlistRouter)

module.exports = router;
