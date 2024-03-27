const mongoose = require('mongoose');

const memoryGameSchema = new mongoose.Schema({
  name: String,
  email: String,
  formattedDateTime: String,
  gameResult: String,
  correctChoice: String,
  gameStartTime: Date,
  gameEndTime: Date
});

const MemoryGame = mongoose.model('MemoryGame', memoryGameSchema);

module.exports = MemoryGame;
