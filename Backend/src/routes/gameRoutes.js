const express = require('express');
const router = express.Router();
const MemoryGame = require('../models/MemoryGame');


router.post('/storeGameData', async (req, res) => {
  const { name, email, formattedDateTime, gameResult, correctChoice } = req.body;

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


router.post('/setGameTime', async (req, res) => {
  const { gameStartTime, gameEndTime, adminUsername, adminPassword } = req.body;

  try {

    if (adminUsername !== 'tusharmakhija237@gmail.com' || adminPassword !== 'Tushar@2002') {
      return res.status(401).json('Unauthorized');
    }


    const updatedGame = await MemoryGame.findOneAndUpdate({}, { gameStartTime, gameEndTime }, { new: true });

    if (!updatedGame) {
      return res.status(404).json('Game data not found');
    }

    res.json('Game start and end time set successfully');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json('Internal Server Error');
  }
});


router.get('/getGameTimes', async (req, res) => {
  try {

    const game = await MemoryGame.findOne();

    if (!game) {
      return res.status(404).json('Game data not found');
    }

    const { gameStartTime, gameEndTime } = game;
    res.json({ gameStartTime, gameEndTime });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json('Internal Server Error');
  }
});

module.exports = router;
