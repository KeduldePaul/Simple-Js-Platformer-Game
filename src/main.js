const cnv = document.querySelector('#cnv');
const ctx = cnv.getContext('2d');

const {width, height} = cnv;

let mouseX, mouseY, pmouseX, pmouseY;

let joy;
let jump;

let scene;
let chara;
let platforms = [];

function setup() {
  controlSetup();
  
  joy = new Joystick();
  //joy.fixed = true;
  //joy.setLocation(60, height - 60);
 
  jump = new GameButton('Jmp', width - 40, height - 66, 30);
  
  scene = new GameScene();
  
  chara = new GameCharacter(20, 20);
  chara.put(30, height - 200);
  scene.addCharacter(chara);
  
  platforms.push(new Platform(70, 280, 100, 20));
  platforms.push(new Platform(110, 200, 100, 20));
  platforms.push(new Platform(100, 100, 80, 20));
  scene.addPlatforms(platforms);
}

function touchDown(id, x, y, t) {
  if (x < width * 0.67)
    joy.onDown(id, x, y);
    
  jump.onDown(id, x, y);
}

function touchMove(id, x, y, t) {
  joy.onMove(id, x, y);
  jump.onMove(id, x, y);
}

function touchUp(id, x, y, t) {
  joy.onUp(id, x, y);
  jump.onUp(id, x, y);
}

function animate(time) {
  requestAnimationFrame(animate);
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  
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

setup();
animate();