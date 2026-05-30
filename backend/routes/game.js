const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

// GET /api/game/words - 単語一覧を取得
router.get('/words', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, word FROM words');
        res.json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
