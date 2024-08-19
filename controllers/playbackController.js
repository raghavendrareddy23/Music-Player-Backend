// controllers/playbackController.js

const { incrementPlayCount, updateLastPlayed } = require('./songController');

const playSong = async (req, res) => {
    const { songId } = req.params;
  
    try {
      await incrementPlayCount(songId);
      await updateLastPlayed(songId);
      res.status(200).json({ message: 'Song is now playing.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = { playSong };