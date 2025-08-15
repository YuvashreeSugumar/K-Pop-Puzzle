// Image pool
const IMG_FILES = Array.from({length: 18}, (_, i) => `assets/images/card${i+1}.png`);

// Level definitions: number of PAIRS per level
const LEVELS = [2, 3, 6, 8, 9, 12]; // grows gradually
let levelIndex = 0;

const q = s => document.querySelector(s);
const board = q('#game-board');
const levelEl = q('#level');
const timeEl = q('#time');
const matchesEl = q('#matches');
const totalEl = q('#total');
const streakEl = q('#streak');
const diffSel = q('#difficulty');

let deck = [];
let flipped = [];
let lock = false;
let matches = 0;
let streak = 0;
let timerId = null;
let startTime = 0;

// Difficulty tweaks (affects flip-back delay)
const DIFF = { easy: 700, normal: 450, hard: 300 };

function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }

function preload(srcs){ srcs.forEach(s => { const img = new Image(); img.src = s; }); }

function buildCard(src){
  const card = document.createElement('div');
  card.className = 'card';
  const inner = document.createElement('div');
  inner.className = 'card-inner';
  const front = document.createElement('div');
  front.className = 'front';
  const img = document.createElement('img');
  img.loading = 'lazy';
  img.src = src;
  front.appendChild(img);
  const back = document.createElement('div');
  back.className = 'back';
  back.textContent = 'K‑POP';
  inner.appendChild(front); inner.appendChild(back);
  card.appendChild(inner);
  card.addEventListener('click', () => onFlip(card, src));
  return card;
}

function draw(){
  board.innerHTML = '';
  shuffle(deck).forEach(src => board.appendChild(buildCard(src)));
}

function startTimer(){
  startTime = performance.now();
  timerId = requestAnimationFrame(tick);
}

function tick(now){
  const t = ((now - startTime)/1000).toFixed(1);
  timeEl.textContent = t;
  timerId = requestAnimationFrame(tick);
}

function onFlip(card, src){
  if(lock || card.classList.contains('flipped')) return;
  if(!timerId) startTimer();
  card.classList.add('flipped');
  flipped.push({card, src});
  if(flipped.length === 2){
    lock = true;
    setTimeout(checkMatch, DIFF[diffSel.value] || 450);
  }
}

function checkMatch(){
  const [a,b] = flipped;
  if(a.src === b.src){
    matches++; streak++;
    matchesEl.textContent = matches;
    streakEl.textContent = streak;
    a.card.style.pointerEvents = 'none';
    b.card.style.pointerEvents = 'none';
  }else{
    streak = 0; streakEl.textContent = 0;
    a.card.classList.remove('flipped');
    b.card.classList.remove('flipped');
  }
  flipped = [];
  lock = false;
  if(matches === deck.length/2){
    cancelAnimationFrame(timerId);
    setTimeout(nextLevel, 400);
  }
}

function setupLevel(){
  const pairs = LEVELS[levelIndex] || LEVELS[LEVELS.length-1];
  levelEl.textContent = (levelIndex+1);
  matches = 0; streak = 0;
  matchesEl.textContent = 0; streakEl.textContent = 0;
  flipped = []; lock = false;
  // choose "pairs" unique images
  const imgs = shuffle([...IMG_FILES]).slice(0, pairs);
  totalEl.textContent = pairs;
  deck = shuffle([...imgs, ...imgs]);
  document.body.classList.remove('level-1','level-2','level-3','level-4','level-5');
  document.body.classList.add(`level-${Math.min(levelIndex+1,5)}`);
  preload(imgs);
  cancelAnimationFrame(timerId); timerId = null; timeEl.textContent = '0.0';
  draw();
}

function nextLevel(){
  levelIndex++;
  alert('Level Complete! Moving to Level ' + (levelIndex+1));
  setupLevel();
}

function resetGame(){
  levelIndex = 0;
  setupLevel();
}

q('#resetBtn').addEventListener('click', resetGame);
window.addEventListener('load', resetGame);
