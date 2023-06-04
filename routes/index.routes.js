const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

module.exports = router;
