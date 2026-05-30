const express = require('express');
const pool = require('../db/connection');
const router = express.Router();

// POST /api/scores - スコアを保存
router.post('/scores', async (req, res) => {
    try {
        const { playerName, score, difficulty } = req.body;

        const result = await pool.query(
            'INSERT INTO scores (player_name, score, difficulty) VALUES ($1, $2, $3) RETURNING id, created_at',
            [playerName, score, difficulty]
        );

        res.json({ success: true, data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
