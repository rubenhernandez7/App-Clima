const express = require('express');
const Clima = require('../models/clima-model');
const router = express.Router();

// Punto final para guardar datos del clima
router.post('/save', async (req, res) => {
  const { city, country, temp, condition, icon, conditionText } = req.body;

  const newClima = new Clima({
    city,
    country,
    temp,
    condition,
    icon,
    conditionText,
  });

  try {
    const savedClima = await newClima.save();
    res.status(201).json(savedClima);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;