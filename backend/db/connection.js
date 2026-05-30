// ライブラリ読み込み
const { Pool } = require('pg');
require('dotenv').config();

// コネクションプール
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME,
});

module.exports = pool;