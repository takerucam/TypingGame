'use strict';

{
  // 初期化
  function Initialize() {
    target.textContent = "Click to Start!"
    result.textContent = "";
    restart.textContent = "";
    timer.textContent = "00:00:000";
    loc = 0;
    elapsedTime = 0;
    target.classList.add('cursor');
    isPlaying = false;
  }

  // ワード（タイピングのお題）の初期化
  function initializeWord(words){
    words = ['red', 'blue', 'yellow'];
    return words;
  }

  // ワードの要素を消す
  function setWord(words) {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    target.textContent = word;
    loc = 0;
  }

  //タイマー
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}:${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  // リスタート
  function restartGame() {
    startGame();
  }

  // Main
  function startGame(){

    Initialize();

    target.addEventListener('click', () => {
      if(!isPlaying){
        
        words = initializeWord(words);

        console.log(words);
        isPlaying = true;
        target.classList.remove('cursor');
        startTime = Date.now();

        setWord(words);

        countUp();

      }
    });

    document.addEventListener('keydown', e => {
      if(e.key !== word[loc]) {
        return;
      }
      loc++;
      target.textContent = '_'.repeat(loc) + word.substring(loc);

      if(loc === word.length) {
        if(words.length === 0) {
          clearTimeout(timeoutId);
          elapsedTime = 0;  
          result.textContent = "Congratulations!!";
          restart.textContent = "もう一度挑戦する";
        }

        setWord(words);

      }

      restart.addEventListener('click', () => {

        restartGame();

      })
    });
  }

  let words = [];
  let word;
  let loc;
  let startTime;
  let timeoutId;
  let elapsedTime;
  let isPlaying;

  const target = document.getElementById('target');
  const result = document.getElementById('result');
  const restart = document.getElementById('restart');
  const timer = document.getElementById('timer');

  startGame();
  
}