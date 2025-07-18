const express = require('express');
const router = express.Router();

// Example GET route for categories
router.get('/', (req, res) => {
  res.json({ message: 'Categories endpoint working!' });
});

module.exports = router;
