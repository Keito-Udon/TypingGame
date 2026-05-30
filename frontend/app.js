// ゲームの状態を管理する変数
let words = [];
let score = 0;
let timeLeft = 60;
let timerInterval = null;
let currentWord = '';

// htmlの要素を取得する
const timerDisplay = document.getElementById('timer');
const wordDisplay = document.getElementById('word');
const inputBox = document.getElementById('input-box');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');
// const startScreen = document.getElementById('start-screen');
// const playingScreen = document.getElementById('playing-screen');
// const resultScreen = document.getElementById('result-screen');

async function fetchWords() {
    const response = await fetch('http://localhost:4000/api/game/words');
    const json = await response.json();
    return json.data.map(item => item.word);
}

// 画面遷移の関数
function showScreen(showId) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('playing-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'none';

    document.getElementById(showId).style.display = 'block';
}

// ランダムに次の単語を表示する関数
function showNextWord() {
    const index = Math.floor(Math.random() * words.length);
    currentWord = words[index];
    wordDisplay.textContent = currentWord;
    inputBox.value = '';
}

// 1秒ごとに呼ばれるタイマーの処理
function tick() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// ゲームを開始する関数
async function startGame() {
    words = await fetchWords();

    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = 'スコア: 0';
    timerDisplay.textContent = '60';

    showScreen('playing-screen');
    showNextWord();
    inputBox.focus();

    timerInterval = setInterval(tick, 1000);
}

// ゲームを終了する関数
async function endGame() {
    clearInterval(timerInterval);

    await fetch('http://localhost:4000/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            playerName: 'player',
            score: score,
            difficulty: 'normal'
        })
    });

    document.getElementById('final-score').textContent = 'スコア: ' + score;
    showScreen('result-screen');
}



// スタートボタンがクリックされたときの処理
startButton.addEventListener('click', () => {
    startGame();
});

// もう一度ボタンがクリックされたときの処理
retryButton.addEventListener('click', () => {
    startGame();
});

// 入力欄が変わるたびに正誤を判定する
inputBox.addEventListener('input', () => {
    const userInput = inputBox.value.trim().toLowerCase();
    const correctWord = currentWord.toLowerCase();

    if (userInput === correctWord) {
        score++;
        scoreDisplay.textContent = 'スコア: ' + score;
        showNextWord();
    }
});

// Escキーで強制終了
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && timerInterval != null) {
        // endGame();
        clearInterval(timerInterval)
        showScreen('start-screen');
    }
})