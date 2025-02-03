class GameScene {
  gravity = 0.5;
  
  chara;
  platforms = [];
  
  constructor() {
    
  }
  
  addCharacter(c) {
    this.chara = c;
    c.setScene(this);
  }
  
  addPlatforms(ps) {
    this.platforms = ps;
  }
  
  update() {
    for (let i = 0; i < this.platforms.length; i++) {
      //jump thru
      if (this.chara.loc.y + this.chara.h - this.chara.vel.y > this.platforms[i].loc.y) continue;
      
      //predic for next move
      this.chara.loc.add(this.chara.vel);
      
      if(this.chara.collisionWith(this.platforms[i])) {
        this.chara.landed = true;
        this.chara.vel.y *= 0;
        this.chara.loc.y = this.platforms[i].loc.y - this.chara.h;
      }
      
      //return from next prediction
      this.chara.loc.sub(this.chara.vel);
    }
  }
  
  draw(ctx) {
    for (let i = 0; i < this.platforms.length; i++) {
      this.platforms[i].draw(ctx);
    }
  }
}