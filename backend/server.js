const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/game');
const scoresRoutes = require('./routes/scores');

const app = express();

// ミドルウェア設定
app.use(express.json());
app.use(cors());

// ルート登録
app.use('/api/game', gameRoutes);
app.use('/api', scoresRoutes);

// サーバー起動
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
