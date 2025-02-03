class GameCharacter {
  loc = new Vec2();
  vel = new Vec2();
  accl = new Vec2();
  
  landed = false;
  
  w;
  h;
  
  scene;
  
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  
  setScene(scene) {
    this.scene = scene;
  }
  
  put(x, y) {
    this.loc.x = x;
    this.loc.y = y;
  }
  
  move(x, y) {
    if (Math.abs(x) > 0.3) {
      this.vel.x = Math.sign(x) * 2;
    } else {
      this.vel.x = 0;
    }
  }
  
  jump() {
    if (!this.isJumping()) {
      this.vel.y -= 12;
      this.landed = false;
    }
  }
  
  isJumping() {
    return !this.landed;
  }
  
  collisionWith(other) {
    return ((this.loc.x - other.loc.x) * (this.loc.x - other.loc.x - other.w) < 0 
        || (this.loc.x + this.w - other.loc.x) * (this.loc.x + this.w - other.loc.x - other.w) < 0)
        && ((this.loc.y - other.loc.y) * (this.loc.y - other.loc.y - other.h) < 0 
        || (this.loc.y + this.h - other.loc.y) * (this.loc.y + this.h - other.loc.y - other.h) < 0); 
  }
  
  update() {
    this.vel.y += this.scene.gravity;
    
    const lim = 8;
    if (this.vel.y > lim) this.vel.y = lim;
    
    this.loc.add(this.vel);
    
    if (this.loc.y > 350) {
      this.landed = true;
      this.vel.y = 0;
      this.loc.y = 350;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.w, this.h);
    
    ctx.restore();
  }
}