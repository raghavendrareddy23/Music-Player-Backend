const Song = require("../models/songModel");
const cloudinary = require("../utils/cloudinary");

exports.addSong = async (req, res) => {
  try {
    const { title, artist } = req.body;

    if (!req.files || !req.files.poster || !req.files.song) {
      return res
        .status(400)
        .json({ message: "Both poster and song files are required" });
    }

    const posterResult = await cloudinary.uploader.upload(
      req.files.poster[0].path,
      {
        folder: "song_images",
      }
    );

    const songResult = await cloudinary.uploader.upload(
      req.files.song[0].path,
      {
        folder: "songs",
        resource_type: "auto",
      }
    );

    const duration = Math.floor(songResult.duration);

    const newSong = new Song({
      title,
      artist,
      posterUrl: posterResult.secure_url,
      poster_public_id: posterResult.public_id,
      songUrl: songResult.secure_url,
      song_public_id: songResult.public_id,
      duration: duration,
      lastPlayed: null
    });

    await newSong.save();

    res.status(201).json({
      message: "Song and poster uploaded successfully",
      song: newSong,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNewSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }).limit(50);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getPopularSongs = async (req, res) => {
  try {
    const songs = await Song.find({ playCount: { $gt: 10 } }) // Find songs with playCount greater than 10
      .sort({ playCount: -1 }) // Sort by playCount in descending order
      .limit(25); // Limit to the top 25 results
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.getRecentlyPlayedSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ lastPlayed: -1 }).limit(10);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.incrementPlayCount = async (songId) => {
  try {
    await Song.findByIdAndUpdate(songId, { $inc: { playCount: 1 } });
  } catch (error) {
    console.error("Error incrementing play count:", error.message);
  }
};

exports.updateLastPlayed = async (songId) => {
  try {
    await Song.findByIdAndUpdate(songId, { lastPlayed: new Date() });
  } catch (error) {
    console.error("Error updating last played date:", error.message);
  }
};
