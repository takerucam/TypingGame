'use strict';

let words = [];
let word;
let loc;
let startTime;
let timeoutId;
let isPlaying;

// 初期化
const Initialize = function () {
  target.textContent = "Click to Start!"
  result.textContent = "";
  restart.textContent = "";
  timer.textContent = "00:00:000";
  loc = 0;
  target.classList.add('cursor');
  isPlaying = false;
};

// ワード（タイピングのお題）の初期化
const initializeWord = function () {
  words = ['red', 'blue', 'yellow'];
  return words;
};

// ワードの要素を消す
const setWord = function (words) {
  word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
  target.textContent = word;
  loc = 0;
};

//タイマー
const countUp = function () {
  const d = new Date(Date.now() - startTime);
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  timer.textContent = `${m}:${s}:${ms}`;

  timeoutId = setTimeout(() => {
    countUp();
  }, 10);
};

// リスタート
const restartGame = function () {
  startGame();
};

// Main
const startGame = function () {

  Initialize();

  target.onclick = () => {
    if (!isPlaying) {
      
      words = initializeWord();

      console.log(words);
      isPlaying = true;
      target.classList.remove('cursor');
      startTime = Date.now();

      setWord(words);

      countUp();

    }
  };

  document.onkeydown = (e) => {
    if (!word || e.key !== word[loc]) {
      return;
    }
    loc++;
    target.textContent = '_'.repeat(loc) + word.substring(loc);

    if (loc === word.length) {
      if (words.length === 0) {
        clearTimeout(timeoutId);
        result.textContent = "Congratulations!!";
        restart.textContent = "もう一度挑戦する";
      }

      setWord(words);

    }

    restart.onclick = () => {
      restartGame();
    };
  };
}

window.onload = startGame;
