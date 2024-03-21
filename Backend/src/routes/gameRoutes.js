const express = require('express');
const router = express.Router();
const MemoryGame = require('../models/MemoryGame');


router.post('/storeGameData', async (req, res) => {
  const { name, email, formattedDateTime, gameResult,correctChoice } = req.body;

  try {
    const newGameData = new MemoryGame({
      name,
      email,
      formattedDateTime,
      gameResult,
      correctChoice
    });

    await newGameData.save();

    res.json('Game data stored successfully');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
