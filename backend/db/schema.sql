-- words テーブル
CREATE TABLE IF NOT EXISTS words (
    id SERIAL PRIMARY KEY,
    word VARCHAR(100) NOT NULL UNIQUE,
    difficulty VARCHAR(50) DEFAULT 'normal'
);

-- scores テーブル
CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    player_name VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'normal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 初期データ：TOEIC単語 20語を挿入
INSERT INTO words (word, difficulty) VALUES
('ability', 'normal'),
('accept', 'normal'),
('account', 'normal'),
('achieve', 'normal'),
('address', 'normal'),
('adjust', 'normal'),
('advance', 'normal'),
('advice', 'normal'),
('affect', 'normal'),
('agree', 'normal'),
('allow', 'normal'),
('announce', 'normal'),
('apply', 'normal'),
('approve', 'normal'),
('arrange', 'normal'),
('assist', 'normal'),
('attach', 'normal'),
('attend', 'normal'),
('attract', 'normal'),
('available', 'normal')
ON CONFLICT (word) DO NOTHING;