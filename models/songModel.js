const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    poster_public_id: {
      type: String,
      required: true,
    },
    songUrl: {
      type: String,
      required: true,
    },
    song_public_id: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    playCount: { type: Number, default: 0 },
    lastPlayed: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
