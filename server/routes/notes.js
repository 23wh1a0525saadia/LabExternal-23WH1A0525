const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// GET /api/notes?page=1&limit=5
// Response: { data: [...], total: 20 }
router.get('/', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 5, 1);

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Note.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Note.countDocuments(),
    ]);

    return res.status(200).json({ data, total });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
