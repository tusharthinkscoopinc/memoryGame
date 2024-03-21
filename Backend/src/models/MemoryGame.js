const mongoose = require('mongoose');

const memoryGameSchema = new mongoose.Schema({
  name: String,
  email: String,
  formattedDateTime: String,
  gameResult: String,
  correctChoice:String
});

const MemoryGame = mongoose.model('MemoryGame', memoryGameSchema);

module.exports = MemoryGame;
