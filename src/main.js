const gameContainer = document.querySelector('div#main');

const cnv = document.querySelector('#cnv');
const ctx = cnv.getContext('2d');

let runningFrame;

const btn = document.querySelector('#start-game button');
const startContainer = document.querySelector('#start-game');

btn.addEventListener("click", openGame);

const closeGameBtn = document.querySelector('#close');
closeGameBtn.addEventListener('click', closeGame);

window.addEventListener('resize', resizeCanvas);

function openGame() {
  gameContainer.style.display = 'block';
  startContainer.style.display = 'none';
  
  // if (!isFullScreen()) {
  //   goFullScreen();
  // }
  
  // goFullScreen();
  resizeCanvas();
  
  //start the game
  setup();
  animate();
}

function closeGame() {
  gameContainer.style.display = 'none';
  startContainer.style.display = 'block';
  
  cancelAnimationFrame(runningFrame);
}

function resizeCanvas() {
  let WIDTH  = window.innerWidth;
  let HEIGHT = window.innerHeight;
  
  const RATIO = 9 / 16;
  
  if (HEIGHT < WIDTH) {
    WIDTH = HEIGHT * RATIO;
  } else {
    HEIGHT = WIDTH / RATIO;
  }
  
  if (HEIGHT > window.innerHeight) {
    HEIGHT = window.innerHeight;
    WIDTH = HEIGHT * RATIO;
  }
  
  // Unused, just for game that the wide value is more than it's height eg for ratio 16 / 9.
  // if (WIDTH > window.innerWidth) {
  //   WIDTH = window.innerWidth;
  //   HEIGHT = WIDTH * RATIO;
  // }
  
  cnv.width = gameWidth;
  cnv.height = gameHeight;
  
  cnv.style.width = WIDTH + 'px';
  cnv.style.height = HEIGHT + 'px';
  
  
  gameContainer.style.width = WIDTH + 'px';
  gameContainer.style.height = HEIGHT + 'px';
  
  canvasScale = WIDTH / gameWidth;
  controlSetup({scaleTo: canvasScale});
}

function goFullScreen() {
  if (cnv.requestFullscreen) {
    cnv.requestFullscreen();
  } else if (cnv.webkitRequestFullscreen) {
    cnv.webkitRequestFullscreen();
  } else if (cnv.msRequestFullscreen) {
    cnv.msRequestFullscreen();
  }
}

// const {width, height} = cnv;
let gameWidth, gameHeight;
let canvasScale;

let mouseX, mouseY, pmouseX, pmouseY;

let joy;
let jump;

let scene;
let chara;
let platforms = [];

function setup() {
  gameWidth = 320;
  gameHeight = 569;
  
  controlSetup({scaleTo: canvasScale});
  resizeCanvas();
  
  joy = new Joystick();
  //joy.fixed = true;
  //joy.setLocation(60, height - 60);
 
  jump = new GameButton('Jmp', gameWidth - 40, gameHeight - 66, 30);
  
  scene = new GameScene();
  
  chara = new GameCharacter(20, 20);
  chara.put(30, gameHeight - 200);
  scene.addCharacter(chara);
  
  platforms.push(new Platform(70, 280, 100, 20));
  platforms.push(new Platform(110, 200, 100, 20));
  platforms.push(new Platform(100, 100, 80, 20));
  scene.addPlatforms(platforms);
}

function touchDown(id, x, y, t) {
  if (x < gameWidth * 0.67)
    joy.onDown(id, x, y);
    
  jump.onDown(id, x, y);
}

function touchMove(id, x, y, t) {
  joy.onMove(id, x, y);
  jump.onMove(id, x, y);
}

function touchUp(id, x, y, t) {
  const scaling = cnv.width / gameWidth;
  x *= scaling;
  y *= scaling;
  
  joy.onUp(id, x, y);
  jump.onUp(id, x, y);
}

function isFullScreen() {
  return document.fullScreenElement || document.webkitFullScreenElement;
}

function animate(time) {
  runningFrame = requestAnimationFrame(animate);
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, gameWidth, gameHeight);
  
  ctx.fillStyle = 'white';
  ctx.fillText(joy.vx, 10, 10);
  ctx.fillText(joy.vy, 10, 20);
  
  if (jump.tapped) {
    chara.jump();
  }
  
  chara.move(joy.vx, joy.vy);
  chara.update();
  
  scene.update();
  scene.draw(ctx);
  
  chara.draw(ctx);
  
  joy.draw(ctx);
  jump.draw(ctx);
}

//setup();
//animate();