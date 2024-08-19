const express = require("express");
const { getAllSongs, addSong, getNewSongs, getPopularSongs, getRecentlyPlayedSongs } = require("../controllers/songController");
const uploadMultiple = require("../utils/multer");

const songRouter = express.Router();

songRouter.post("/upload", uploadMultiple, addSong);
songRouter.get("/", getAllSongs);
songRouter.get("/newSongs", getNewSongs);
songRouter.get("/popularSongs", getPopularSongs);
songRouter.get("/recentSongs", getRecentlyPlayedSongs);


module.exports = songRouter;
