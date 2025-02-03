class Platform {
  loc;
  
  constructor(x, y, w, h) {
    this.loc = new Vec2(x, y);
    this.w = w;
    this.h = h;
  }
  
  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.loc.x, this.loc.y, this.w, this.h);
  }
}