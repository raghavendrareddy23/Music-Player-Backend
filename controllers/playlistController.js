const Playlist = require("../models/playlistModel");


exports.getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate(
      "songs"
    );
    res.status(200).json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserPlaylistsById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs');
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const { name, songIds } = req.body;
    console.log("user id: ",req.user._id);
    const newPlaylist = new Playlist({
      name,
      userId: req.user._id,
      songs: songIds,
    });
    ;
    await newPlaylist.save();
    res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId, songId } = req.body;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    playlist.songs.push(songId);
    await playlist.save();
    res.status(200).json({ message: "Song added to playlist", playlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
