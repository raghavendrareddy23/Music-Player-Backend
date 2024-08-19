const express = require('express');
const playlistRouter = express.Router();
const { getUserPlaylists, createPlaylist, addSongToPlaylist, getUserPlaylistsById } = require('../controllers/playlistController');
const {isAuthenticated} = require('../utils/authMiddleware');

// Routes for user-defined playlists
playlistRouter.get('/', isAuthenticated, getUserPlaylists);
playlistRouter.get('/:id', isAuthenticated, getUserPlaylistsById);
playlistRouter.post('/create',isAuthenticated, createPlaylist);
playlistRouter.post('/add-song', isAuthenticated, addSongToPlaylist);


module.exports = playlistRouter;
